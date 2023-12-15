import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

@Service()
export class KeyModel {
    public getPublicKey = async (user_id: number[]) => {
        try {
            const query = this.getPublicKeyQuery();
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.query(query, [user_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    public getSingleRoomSectetKey = async (
        user_id: string,
        room_id: string
    ) => {
        try {
            const query = this.getSingleRoomSectetKeyQuery();
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.query(query, [
                    user_id,
                    room_id,
                    user_id,
                    room_id,
                    user_id,
                    room_id,
                ]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    public getGroupRoomSectetKey = async (user_id: string, room_id: string) => {
        try {
            const query = this.getGroupRoomSectetKeyQuery();
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.query(query, [user_id, room_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    ////////////////////////////////쿼리문////////////////////////////////
    private getPublicKeyQuery = (): string => {
        const query = ` SELECT user_id, public_key
                        FROM account
                        WHERE user_id IN (?);
        `;
        return query;
    };
    private getSingleRoomSectetKeyQuery = (): string => {
        const query = `SELECT 
                            CASE 
                                WHEN user_id1 = ? AND room_id = ? THEN user1_secret_key
                                WHEN user_id2 = ? AND room_id = ? THEN user2_secret_key
                                ELSE NULL
                            END AS secret_key
                        FROM singleChatroom
                        WHERE (? IN (user_id1, user_id2)) AND room_id = ?;
    `;
        return query;
    };

    private getGroupRoomSectetKeyQuery = (): string => {
        const query = `SELECT secret_key from groupChatAttender where user_id = ? and chatroom_id = ?;`;
        return query;
    };
}
