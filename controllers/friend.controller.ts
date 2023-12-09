import Container from "typedi";
import { Response, Request, NextFunction } from "express";
import { FriendModel } from "../models/friend.model";

export class FriendController {
    public friendModel = Container.get(FriendModel);

    //친구 추가
    public addFriend = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const user_id: string = String(request.headers.user_id);
        const friend_id: string = String(request.body.friend_id);
        // 친구 수락기능이 없기때문에 임의로 양방향 친구추가
        const result1 = await this.friendModel.addFriend(user_id, friend_id);
        const result2 = await this.friendModel.addFriend(friend_id, user_id);
        if (!(result1 && result2)) {
            response.status(400).json({ message: "친구 추가 실패" });
            return;
        }
        response.status(200).json({ message: "친구 추가 성공" });
    };

    //친구목록 및 프로필 가져오기
    public getFriendList = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const user_id: string = String(request.headers.user_id);
        const result = await this.friendModel.getFriendList(user_id);
        if (!result) {
            response.status(400).json({ message: "친구목록 가져오기 실패" });
            return;
        }
        response
            .status(200)
            .json({ message: "친구목록 가져오기 성공", data: result });
    };
}
