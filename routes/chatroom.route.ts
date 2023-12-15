import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";
import { ChatroomController } from "../controllers/chatroom.controller";

export class ChatroomRoute implements Routes {
    public path = "/chatroom";
    public router = express.Router();
    public chatRoom = new ChatroomController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`/singleroom`, this.chatRoom.createSingleRoom);
        this.router.get(`/`, this.chatRoom.getChtroomList);
    }
}
