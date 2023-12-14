import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";
import PublicKeyController from "../controllers/publicKey.controller";

export class PublicKeyRoute implements Routes {
    public path = "/publickey";
    public router = express.Router();
    public publicKey = new PublicKeyController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //publicKey 받아오기
        this.router.post(`/publickey`, this.publicKey.getPublicKey);
    }
}
