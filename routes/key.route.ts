import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";
import KeyController from "../controllers/key.controller";

export class KeyRoute implements Routes {
    public path = "/key";
    public router = express.Router();
    public key = new KeyController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //publicKey 받아오기
        this.router.get(`/single/:roomid`, this.key.getSectetKey);
        this.router.post(`/publickey`, this.key.getPublicKey);
    }
}
