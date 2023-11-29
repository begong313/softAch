import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";

export class AuthRoute implements Routes {
    public path = "/auth";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {}
}
