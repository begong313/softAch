import dotenv from "dotenv";
import ampq from "amqplib";

dotenv.config();

class RabitMQconnection {
    private rabbitMQHOST: string;
    private rabbitMQPort: string;
    private rabbitMQUser: string;
    private rabbitMQPassword: string;

    public constructor() {
        this.rabbitMQHOST = process.env.RABBITMQ_HOST || "localhost";
        this.rabbitMQPort = process.env.RABBITMQ_PORT || "5672";
        this.rabbitMQUser = process.env.RABBITMQ_USER || "guest";
        this.rabbitMQPassword = process.env.RABBITMQ_PASSWORD || "guest";

        //클래스 생성 시 rabitmq연결
        this.connect();
    }

    private async connect() {
        const connection = await ampq.connect({
            hostname: this.rabbitMQHOST,
            port: Number(this.rabbitMQPort),
            username: this.rabbitMQUser,
            password: this.rabbitMQPassword,
        });
        const channel = await connection.createChannel();
    }
}
