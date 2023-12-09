import Container from "typedi";
import { UserModel } from "../models/user.model";
import { Response, Request, NextFunction } from "express";

export class UserController {
    public userModel = Container.get(UserModel);
    //초기 프로필 설정
    public setProfile = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const user_id: string = String(request.headers.user_id);
        const nickname = request.body.nickname;
        var imageFile;

        if (request.file) {
            //임시로 빨간줄 안뜨게함
            imageFile = (request.file as any).location;
        } else {
            //첨부사진이 없을 때
            imageFile = process.env.S3_DEFAULT_PROFILE;
        }

        if (!(await this.userModel.setProfile(user_id, nickname, imageFile))) {
            response.status(400).json({ message: "프로필 저장 실패" });
            return;
        }
        response.status(200).json({ message: "프로필 저장 성공" });
    };

    //프로필 수정 (추후 작업하자)
    public updateProfile = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {};
}
