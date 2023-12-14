import { Service } from "typedi";
import promisepool from "../lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

@Service()
export class PublicKeyModel {
    public getPublicKey = async (user_id: number[]) => {
        try {
            const query = this.getPublicKeyQuery();
            const interpolatedQuery = promisepool.format(query, [user_id]);
            console.log("Executing query:", interpolatedQuery);
            const [rows]: [RowDataPacket[], FieldPacket[]] =
                await promisepool.query(query, [user_id]);
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    private getPublicKeyQuery = (): string => {
        const query = ` SELECT user_id, public_key
                        FROM account
                        WHERE user_id IN (?);
        `;
        return query;
    };
}
