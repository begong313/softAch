import express, { Request, Response } from "express";
import { Routes } from "../interface/routes.interface";
import { UserController } from "../controllers/user.controller";
import { uploadProfile } from "../lib/multerCustom";

//프로필 세팅 등 유저 관련 라우터
export class UserRoute implements Routes {
    public path = "/user";
    public router = express.Router();
    public user = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //프로필 세팅
        this.router.post(
            `/profile`,
            uploadProfile.single("image"),
            this.user.setProfile
        );
        this.router.get(`/profile`, this.user.getProfile);
    }
}
