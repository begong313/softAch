import passport from "passport";
import { Strategy } from "passport-local";

export default function localstrategy() {
    passport.use(
        new Strategy(
            { usernameField: "email", passwordField: "password" },
            async function (email, password, done) {
                try {
                    console.log(email, password);
                    if (email === "abc@naver.com" && password === "1234") {
                        return done(null, {
                            email: "abc@aver.com",
                            nickname: "abc",
                        });
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
