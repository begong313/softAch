import express from "express";
import { Routes } from "./interface/routes.interface";

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
    private init(): void {}
    private useMiddleWares(): void {}
    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }

    // private initializeErrorHandling() {
    //     this.app.use(ErrorMiddleware);
    // }
}
