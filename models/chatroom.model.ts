import { Service } from "typedi";
import promisepool from "../lib/dbConnector";

@Service()
export class ChatroomModel {
    public createSingleRoom = async (
        user_id: number,
        friend_id: number,
        owner_secret_key: string,
        attender_secret_key: string
    ) => {
        try {
            const query = this.createSingleRoomQuery();
            const [rows] = await promisepool.execute(query, [
                user_id,
                friend_id,
                owner_secret_key,
                attender_secret_key,
            ]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    private createSingleRoomQuery = (): string => {
        const query = `INSERT INTO singleChatroom (owner_id, attender_id, owner_secret_key, attender_secret_key) VALUES (?, ?, ?, ?);`;
        return query;
    };
}
