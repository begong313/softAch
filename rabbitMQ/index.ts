import dotenv from "dotenv";
import ampq from "amqplib";
import chat from "../chatSchema/chat";

dotenv.config();

export default class RabitMQconnection {
    private rabbitMQHOST: string;
    private rabbitMQPort: string;
    private rabbitMQUser: string;
    private rabbitMQPassword: string;
    private channel: ampq.Channel | null = null;

    public constructor() {
        this.rabbitMQHOST = process.env.RABBITMQ_HOST || "localhost";
        this.rabbitMQPort = process.env.RABBITMQ_PORT || "5672";
        this.rabbitMQUser = process.env.RABBITMQ_USER || "guest";
        this.rabbitMQPassword = process.env.RABBITMQ_PASSWORD || "guest";
    }

    private async connect() {
        const connection = await ampq.connect({
            hostname: this.rabbitMQHOST,
            port: Number(this.rabbitMQPort),
            username: this.rabbitMQUser,
            password: this.rabbitMQPassword,
        });
        const channel = await connection.createChannel();
        this.channel = channel;
    }

    public getChannel = async () => {
        await this.connect();
        return this.channel;
    };

    public consumeMessage = async () => {
        const queueName = "chat";
        await this.connect();
        await this.channel!.assertQueue(queueName, { durable: true });
        this.channel!.consume(
            queueName,
            async (message) => {
                const data = JSON.parse(message!.content.toString());
                try {
                    const chatDataModel = new chat(data);
                    await chatDataModel.save();
                    console.log("rabbitMQ success");
                } catch (e) {
                    console.error("mongofail ", e);
                }
                this.channel?.ack(message!);
            },
            { noAck: false }
        );
    };
}
