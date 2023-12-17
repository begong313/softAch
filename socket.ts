import SocketIO, { Socket } from "socket.io";
import express from "express";
import chat from "./chatSchema/chat";
import mongoose from "mongoose";
import RabitMQconnection from "./rabbitMQ";

export default class SocketManager {
    private io: SocketIO.Server;
    private rabbitChannel: any;

    public constructor(server: any, app: express.Application) {
        this.io = new SocketIO.Server(server);
        app.set("io", this.io);
        this.ioSetting();
    }

    private ioSetting = async () => {
        const rabbitmq = await new RabitMQconnection().getChannel();
        this.rabbitChannel = rabbitmq;
        this.io.on("connection", (socket: Socket) => {
            console.log("A user connected");

            socket.on("join", (data) => {
                console.log("join", data.room);
                console.log("방번호 ", data, "접속인 Id", data.sender);
                socket.join(data.room);
            });
            // 클라이언트로부터 메시지를 수신할 때 처리
            socket.on("chat", async (data) => {
                try {
                    const chatdata = new chat({
                        room: data.room,
                        sender: data.sender,
                        message: data.message,
                        time: Date.now(),
                    });

                    const message = JSON.stringify(chatdata);
                    // rabbitMQ로 메시지 전송
                    this.rabbitChannel.sendToQueue(
                        "chat",
                        Buffer.from(message)
                    );
                    // const collection = mongoose.connection.collection(
                    //     data.room
                    // );
                    // await collection.insertOne(chatdata);

                    this.io.to(data.room).emit("chat", data);
                } catch (e) {
                    console.log(e);
                }
            });

            // 소켓 연결이 종료되었을 때 처리
            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });
    };
}
