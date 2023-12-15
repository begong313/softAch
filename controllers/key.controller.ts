import Container from "typedi";
import { Response, Request, NextFunction } from "express";
import { KeyModel } from "../models/key.model";

export default class KeyController {
    public publicKeyModel = Container.get(KeyModel);

    //public key 가져오기
    public getPublicKey = async (request: Request, response: Response) => {
        const user_id: string = String(request.headers.user_id);
        try {
            const friend_id: number[] = request.body.friend_id;
            const rows = await this.publicKeyModel.getPublicKey(friend_id);
            response.json({ data: rows });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };
    // single chatroom에서 본인의 secret key 가져오기
    public getSectetKey = async (request: Request, response: Response) => {
        const user_id: string = String(request.headers.user_id);
        const room_id: string = String(request.params.roomid);

        try {
            const rows = await this.publicKeyModel.getSingleRoomSectetKey(
                user_id,
                room_id
            );
            if (!rows) {
                response.json({ data: null });
                return;
            }
            response.json({ data: rows[0] });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };

    // 그룹챗에서 본인의 secret key 가져오기
    public getGroupKey = async (request: Request, response: Response) => {
        const user_id: string = String(request.headers.user_id);
        const room_id: string = String(request.params.roomid);

        try {
            const rows = await this.publicKeyModel.getGroupRoomSectetKey(
                user_id,
                room_id
            );
            if (!rows) {
                response.json({ data: null });
                return;
            }
            response.json({ data: rows[0] });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };
}
