import { Response, Request, NextFunction } from "express";

export class AuthController {
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
