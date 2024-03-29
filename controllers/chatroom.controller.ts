import Container from "typedi";
import { Response, Request, NextFunction } from "express";
import { ChatroomModel } from "../models/chatroom.model";
import mongoose from "mongoose";

export class ChatroomController {
    public chatroomModel = Container.get(ChatroomModel);
    public createSingleRoom = async (request: Request, response: Response) => {
        const user_id: string = String(request.headers.user_id);
        const friend_id: string = String(request.body.friend_id);
        const user_secret_key: string = String(request.body.owner_secret_key);
        const friend_secret_key: string = String(
            request.body.attender_secret_key
        );
        var user_id1: string;
        var user_id2: string;
        var user1_secret_key: string;
        var user2_secret_key: string;

        // 중복방지를 위한 id 순 정렬
        if (Number(user_id) < Number(friend_id)) {
            user_id1 = user_id;
            user1_secret_key = user_secret_key;
            user_id2 = friend_id;
            user2_secret_key = friend_secret_key;
        } else {
            user_id1 = friend_id;
            user1_secret_key = friend_secret_key;
            user_id2 = user_id;
            user2_secret_key = user_secret_key;
        }
        const room_id = "S" + String(user_id1) + "_" + String(user_id2);

        try {
            await mongoose.connection.createCollection(String(room_id));
            const rows = await this.chatroomModel.createSingleRoom(
                user_id1,
                user_id2,
                user1_secret_key,
                user2_secret_key,
                room_id
            );

            //방이 이미 있는 경우 방 번호를 반환
            if (!rows) {
                const rows = await this.chatroomModel.getSingleRoomNum(
                    user_id1,
                    user_id2
                );
                response.json({ data: rows });
                return;
            }
            response.json({ data: room_id });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };
    // 채팅방 리스트 가져오기
    public getChtroomList = async (request: Request, response: Response) => {
        const user_id: string = String(request.headers.user_id);
        try {
            const rows = await this.chatroomModel.getSingleChatroomList(
                user_id
            );
            const rows2 = await this.chatroomModel.getGroupChatroomList(
                user_id
            );

            response.json({ data: rows, data2: rows2 });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };

    //단체 채팅방 생성
    public createGroupRoom = async (request: Request, response: Response) => {
        try {
            const room_name: string = String(request.body.room_name);
            const enter_data: string[][] = request.body.enter_data;
            const room_id = await this.chatroomModel.createGroupRoom(room_name);
            for (let i = 0; i < enter_data.length; i++) {
                enter_data[i].push(String(room_id));
            }
            await mongoose.connection.createCollection(String(room_id));
            await this.chatroomModel.addGroupChatMember(enter_data);
            response.status(200).json({ data: room_id });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };
    // 톡방 체팅 데이터 불러오기
    public getChatData = async (request: Request, response: Response) => {
        const room_id: string = String(request.params.roomid);
        const timedata = Number(request.query.time);
        try {
            const collection = mongoose.connection.collection(room_id);

            var rows;
            if (timedata) {
                rows = await collection
                    .find({ sendAt: { $gte: timedata } })
                    .toArray();
            } else {
                rows = await collection.find().toArray();
            }

            response.json({ data: rows });
        } catch (e) {
            console.log(e);
            response.status(400).json({ message: "오류" });
        }
    };
}
