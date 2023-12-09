import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import promisepool from "../lib/dbConnector";
import { FieldPacket, RowDataPacket } from "mysql2";

export default function localstrategy() {
    passport.use(
        new Strategy(
            { usernameField: "email", passwordField: "password" },
            async function (email, password, done) {
                try {
                    const query = `select user_id, email,password from account where email = ?`;
                    const [rows]: [RowDataPacket[], FieldPacket[]] =
                        await promisepool.execute(query, [email]);

                    //나중에 리팩토링
                    //아이디가 존재하지 않으면
                    if (rows.length == 0) {
                        return done(null, false, {
                            message: "등록되지 않은 회원",
                        });
                    }

                    const result = await bcrypt.compare(
                        password,
                        rows[0].password
                    );

                    console.log(result);
                    if (result) {
                        return done(null, rows[0].user_id);
                    } else {
                        return done(null, false, {
                            message: "로그인 실패",
                        });
                    }
                } catch (err) {
                    console.error(err);
                    done(err);
                }
            }
        )
    );
}
