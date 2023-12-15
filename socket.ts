import SocketIO, { Socket } from "socket.io";
import express from "express";
import chat from "./chatSchema/chat";

export function setSocket(server: any, app: express.Application) {
    const io = new SocketIO.Server(server);
    app.set("io", io);
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("join", (data) => {
            console.log("join", data.room);
            console.log("방번호 ", data, "접속인 Id", data.sender);
            socket.join(data.room);
        });
        // 클라이언트로부터 메시지를 수신할 때 처리
        socket.on("chat", (data) => {
            try {
                const chatdata = new chat({
                    room: data.room,
                    sender: data.sender,
                    message: data.message,
                    time: Date.now(),
                });
                // const collection = mongoose.connection.collection(data.room);
                // await collection.insertOne(chatdata);
                io.to(data.room).emit("chat", data);
            } catch (e) {
                console.log(e);
            }
        });

        // 소켓 연결이 종료되었을 때 처리
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
}
