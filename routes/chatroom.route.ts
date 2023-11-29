import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";

export class ChatroomRoute implements Routes {
    public path = "/chatroom";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {}
}
