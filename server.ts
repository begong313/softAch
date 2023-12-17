import "reflect-metadata";
import { App } from "./app";
import { UserRoute } from "./routes/user.route";
import { AuthRoute } from "./routes/auth.route";
import { ChatRoute } from "./routes/chat.route";
import { ChatroomRoute } from "./routes/chatroom.route";
import { FreindRoute } from "./routes/friend.route";
import { KeyRoute } from "./routes/key.route";
import SocketManager from "./socket";

try {
    const app = new App([
        new UserRoute(),
        new ChatRoute(),
        new AuthRoute(),
        new ChatroomRoute(),
        new FreindRoute(),
        new KeyRoute(),
    ]);

    const server = app.listen();
    new SocketManager(server, app.app);
} catch (err) {
    console.log(err);
}
