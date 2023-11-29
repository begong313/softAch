import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";

export class AccountRoute implements Routes {
    public path = "/account";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {}
}
