import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

@Service()
export class AuthModel {
    //이메일 중복체크

    public emailDuplicationCheck = async (
        userEmail: string
    ): Promise<RowDataPacket[] | string[]> => {
        try {
            const query = this.emailDuplicationCheckQuery();
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.execute(query, [userEmail]);
            return rows;
        } catch (e) {
            console.log(e);
            return ["err"];
        }
    };

    public createAccount = async (
        userEmail: string,
        password: string,
        publicKey: string
    ): Promise<boolean> => {
        try {
            const query = this.createAccountQueury();
            await promisepool.execute(query, [userEmail, password, publicKey]);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    private emailDuplicationCheckQuery = (): string => {
        const query = `select email from account where email = ?`;
        return query;
    };
    private createAccountQueury = (): string => {
        const query = `insert into account (email, password, public_key) values (?, ?, ?)`;
        return query;
    };
}
