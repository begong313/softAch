import Container from "typedi";
import { UserModel } from "../models/user.model";
import { Response, Request, NextFunction } from "express";

export class UserController {
    public userModel = Container.get(UserModel);
    public setProfile = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const user_id: string = String(request.headers.user_id);
        const nickname = request.body.nickname;
        var imageFile;
        //첨부사진이 없을 때

        if (request.file) {
            imageFile = request.file.path;
        } else {
            imageFile = "url"; //s3의 default 대체해야함
        }

        await this.userModel.setProfile(user_id, nickname, imageFile);
    };
}
