import "reflect-metadata";
import { App } from "./app";
import { UserRoute } from "./routes/user.route";
import { AuthRoute } from "./routes/auth.route";
import { ChatRoute } from "./routes/chat.route";
import { ChatroomRoute } from "./routes/chatroom.route";
import { FreindRoute } from "./routes/friend.route";

try {
    const app = new App([
        new UserRoute(),
        new ChatRoute(),
        new AuthRoute(),
        new ChatroomRoute(),
        new FreindRoute(),
    ]);

    const server = app.listen();
} catch (err) {
    console.log(err);
}
