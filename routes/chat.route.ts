import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";

export class ChatRoute implements Routes {
    public path = "/chat";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {}
}
