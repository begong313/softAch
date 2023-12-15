import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { FieldPacket, ResultSetHeader } from "mysql2";

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

    // 그룹챗 리스트 서치 쿼리
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
    // 그룹챗방 생성
    public createGroupRoom = async (room_name: string) => {
        try {
            const query = this.createGroupChatroomQuery();

            const [results]: [ResultSetHeader, FieldPacket[]] =
                await promisepool.execute(query, [room_name]);
            return results.insertId;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    public addGroupChatMember = async (data: string[][]) => {
        try {
            const valuesString = data
                .map((row) => `('${row.join("','")}')`)
                .join(",");
            console.log(data);
            const query = `INSERT INTO groupChatAttender (user_id, secret_key, chatroom_id) VALUES ${valuesString};`;
            const [result] = await promisepool.query(query);
            return result;
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

    // 그룹챗방 생성
    private createGroupChatroomQuery = (): string => {
        const query: string = `INSERT INTO groupChatroom (room_name) VALUES (?);`;
        return query;
    };
    private addGroupChatMemeberQuery = (): string => {
        const query = `INSERT INTO groupChatAttender (user_id, secret_key, chatroom_id) VALUES (?);`;
        return query;
    };
}
