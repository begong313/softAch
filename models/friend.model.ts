import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

@Service()
export class FriendModel {
    public addFriend = async (user_id: string, friend_id: string) => {
        try {
            const query = this.addFriendQuery();
            await promisepool.execute(query, [user_id, friend_id]);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    public getFriendList = async (user_id: string) => {
        try {
            const query = this.getFriendListQuery();
            const [rows] = await promisepool.execute(query, [user_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    public getFriendId = async (friend_email: string) => {
        try {
            const query = this.getFriendIdQuery();
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.execute(query, [friend_email]);
            return rows[0].user_id;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    private addFriendQuery = (): string => {
        const query = ` insert into friendship (user_id, user_id2) values (?, ?)`;
        return query;
    };
    private getFriendListQuery = (): string => {
        const query = ` select user_id, nickname, profile_pic from profile where user_id in (select user_id2 from friendship where user_id = ?)`;
        return query;
    };
    private getFriendIdQuery = (): string => {
        const query = ` select user_id from account where email = ?`;
        return query;
    };
}
