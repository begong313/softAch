import express from "express";
import { Routes } from "./interface/routes.interface";
import passportInit from "./passport";
import bodyParser from "body-parser";

export class App {
    app: express.Application;
    env: string;
    port: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || "development";
        this.port = process.env.PORT || "8000";

        this.init();
        this.useMiddleWares();
        this.initializeRoutes(routes);

        // 순서가 중요하다. error처리는 마지막에 넣어야함
        // this.initializeErrorHandling();
    }
    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(this.port, "에서 동작중");
            console.log(`env : ${this.env}`);
        });
    }
    private init(): void {
        this.app.set("port", this.port);
    }
    private useMiddleWares(): void {
        this.app.use(express.json({ limit: "5mb" }));
        this.app.use(
            //body 용량제한
            bodyParser.urlencoded({
                limit: "5mb",
                extended: true,
            })
        );

        passportInit();
    }
    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }

    // private initializeErrorHandling() {
    //     this.app.use(ErrorMiddleware);
    // }
}
