import Container from "typedi";
import { Response, Request, NextFunction } from "express";
import { PublicKeyModel } from "../models/publicKey.model";

export default class PublicKeyController {
    public publicKeyModel = Container.get(PublicKeyModel);

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
}
