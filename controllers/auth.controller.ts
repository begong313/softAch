import { Response, Request, NextFunction } from "express";
import { Container } from "typedi";
import { AuthModel } from "../models/auth.model";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
export class AuthController {
    public authModel = Container.get(AuthModel);
    public join = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        console.log(request.body);
        const userEmail = request.body.email;
        const password = request.body.password;
        const publicKey = request.body.publicKey;

        //이메일 중복체크
        const dupCheck: RowDataPacket[] | string[] =
            await this.authModel.emailDuplicationCheck(userEmail);
        if (dupCheck.length > 0) {
            if (dupCheck[0] === "err") {
                response.status(500).json({ message: "서버 오류" });
                return;
            }
            response.status(409).json({ message: "중복된 이메일" });
            return;
        }
        //비밀번호 암호화
        const hashedPWD = await bcrypt.hash(password, 8);
        const check = await this.authModel.createAccount(
            userEmail,
            hashedPWD,
            publicKey
        );
        console.log(check);
        //중복체크 후 회원가입
        if (!check) {
            response.status(400).json({ message: "회원가입 실패" });
            return;
        }

        response.status(200).json({ message: "회원가입 성공" });
    };
    public loginError = (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        if (request.query.error) {
            response.status(401).json({
                message: request.query.error + "로그인 실패",
            });
            return;
        }
        response.status(401).json({
            message: "로그인 실패",
        });
    };

    public loginCallback = (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        response
            .status(200)
            .json({ message: "로그인 성공", data: request.user });
    };
}
