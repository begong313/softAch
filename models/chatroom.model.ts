import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { get } from "http";

@Service()
export class ChatroomModel {
    // 방생성
    public createSingleRoom = async (
        user_id1: string,
        user_id2: string,
        user1_secret_key: string,
        user2_secret_key: string,
        room_id: string
    ) => {
        try {
            const query = this.createSingleRoomQuery();
            const [rows] = await promisepool.execute(query, [
                user_id1,
                user_id2,
                user1_secret_key,
                user2_secret_key,
                room_id,
            ]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    // singleChatroom 테이블에서 방번호 가져오기
    public getSingleRoomNum = async (user_id1: string, user_id2: string) => {
        try {
            const query = this.getSingleRoomQuery();
            const [rows] = await promisepool.execute(query, [
                user_id1,
                user_id2,
            ]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    public getSingleChatroomList = async (user_id: string) => {
        try {
            const query = this.getSingleChatroomListQuery();
            const [rows] = await promisepool.execute(query, [user_id, user_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    public getGroupChatroomList = async (user_id: string) => {
        try {
            const query = this.getGroupChatroomListQuery();
            const [rows] = await promisepool.execute(query, [user_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    private createSingleRoomQuery = (): string => {
        const query = `INSERT INTO singleChatroom (user_id1, user_id2, user1_secret_key, user2_secret_key, room_id) VALUES (?, ?, ?, ?,?);`;
        return query;
    };
    private getSingleRoomQuery = (): string => {
        const query = `SELECT room_id FROM singleChatroom WHERE user_id1 = ? AND user_id2 = ?;`;
        return query;
    };
    //개인채팅방 목록 가져오기 쿼리
    private getSingleChatroomListQuery = (): string => {
        const query = `SELECT room_id, user_id1, user_id2 FROM singleChatroom WHERE user_id1 = ? OR user_id2 = ?;`;
        return query;
    };
    private getGroupChatroomListQuery = (): string => {
        const query = `select ga.chatroom_id from groupchatAttender as ga join groupChatroom as gc on ga.chatroom_id = gc.chatroom_id where ga.user_id = ?;`;
        return query;
    };
}
