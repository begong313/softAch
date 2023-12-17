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
    public getProfile = async (user_id: string) => {
        try {
            const query = this.getProfileQuery();
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.execute(query, [user_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    public emailCheck = async (email: string) => {
        const query = this.emailCheckQuery();
        const [rows]: [RowDataPacket[], FieldPacket[]] =
            await promisepool.execute(query, [email]);
        return rows;
    };

    ////////////////////////쿼리문////////////////////////
    private setProfileQuery = (): string => {
        const query = ` insert into profile (user_id, nickname, profile_pic) values (?, ?,?)`;
        return query;
    };

    private getProfileQuery = (): string => {
        const query = ` select user_id, nickname, profile_pic from profile where user_id = ?`;
        return query;
    };
    private emailCheckQuery = (): string => {
        const query = ` select email from account where email = ?`;
        return query;
    };
}
