import Container from "typedi";
import { Response, Request, NextFunction } from "express";
import { ChatroomModel } from "../models/chatroom.model";

export class ChatroomController {
    public chatroomModel = Container.get(ChatroomModel);
    public createSingleRoom = async (request: Request, response: Response) => {
        const user_id: string = String(request.headers.user_id);
        const friend_id: string = String(request.body.friend_id);
        const owner_secret_key: string = String(request.body.owner_secret_key);
        const attender_secret_key: string = String(
            request.body.attender_secret_key
        );
        try {
            const rows = await this.chatroomModel.createSingleRoom(
                Number(user_id),
                Number(friend_id),
                owner_secret_key,
                attender_secret_key
            );
            response.json({ data: rows });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };
}
