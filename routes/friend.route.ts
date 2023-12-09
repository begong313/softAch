import express from "express";
import { Routes } from "../interface/routes.interface";
import { FriendController } from "../controllers/friend.controller";

//프로필 세팅 등 유저 관련 라우터
export class FreindRoute implements Routes {
    public path = "/friend";
    public router = express.Router();
    public friend = new FriendController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //친구추가
        this.router.post(`/add`, this.friend.addFriend);

        //친구목록 및 프로필 가져오기
        this.router.get(`/list`, this.friend.getFriendList);
    }
}
