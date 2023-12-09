import express, { NextFunction, Request, Response } from "express";
import { Routes } from "../interface/routes.interface";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller";
import passportConfig from "../config/passportConfig";

export class AuthRoute implements Routes {
    public path = "/auth";
    public router = express.Router();
    public auth = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 로그인
        this.router.post(
            `/local/login`,
            (request: Request, response: Response, next: NextFunction) => {
                passport.authenticate(
                    "local",
                    passportConfig.setting,
                    (err: any, user: any, info: any) => {
                        if (err) {
                            return next(err);
                        }

                        if (!user) {
                            if (info == undefined) {
                                return response.redirect(`/login-error`);
                            }
                            return response
                                .status(401)
                                .redirect(
                                    `${
                                        this.path
                                    }/login-error?error=${encodeURIComponent(
                                        info.message
                                    )}`
                                );
                        }

                        request.user = user;
                        return next();
                    }
                )(request, response, next);
            },
            this.auth.loginCallback
        );
        // 회원가입
        this.router.post(`/local/join`, this.auth.join);

        // 로그인 에러
        this.router.get(`/login-error`, this.auth.loginError);
    }
}
