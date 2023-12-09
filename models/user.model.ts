import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

@Service()
export class UserModel {
    public setProfile = async (
        user_id: string,
        nickname: string,
        imageFile: string
    ) => {
        try {
            const query = this.setProfileQuery();
            await promisepool.execute(query, [user_id, nickname, imageFile]);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    private setProfileQuery = (): string => {
        const query = ` insert into profile (user_id, nickname, profile_pic) values (?, ?,?)`;
        return query;
    };
}
