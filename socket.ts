import SocketIO, { Socket } from "socket.io";
import express from "express";

export function setSocket(server: any, app: express.Application) {
    const io = new SocketIO.Server(server);
    app.set("io", io);
    io.on("connection", (socket) => {
        console.log("A user connected");

        // 클라이언트로부터 메시지를 수신할 때 처리
        socket.on("message", (data) => {
            console.log("Message from client:", data);

            // 클라이언트에게 응답 메시지 전송
            socket.emit("message", "Hello, client! I received your message.");
        });

        // 소켓 연결이 종료되었을 때 처리
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
}
