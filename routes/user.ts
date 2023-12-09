import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";
import { UserController } from "../controllers/user.controller";
import { uploadProfile } from "../lib/multerCustom";

export class UserRoute implements Routes {
    public path = "/user";
    public router = express.Router();
    public user = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `/profile`,
            uploadProfile.single("image"),
            this.user.setProfile
        );
    }
}
