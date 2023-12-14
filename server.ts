import "reflect-metadata";
import { App } from "./app";
import { UserRoute } from "./routes/user.route";
import { AuthRoute } from "./routes/auth.route";
import { ChatRoute } from "./routes/chat.route";
import { ChatroomRoute } from "./routes/chatroom.route";
import { FreindRoute } from "./routes/friend.route";
import { PublicKeyRoute } from "./routes/publicKey.route";

try {
    const app = new App([
        new UserRoute(),
        new ChatRoute(),
        new AuthRoute(),
        new ChatroomRoute(),
        new FreindRoute(),
        new PublicKeyRoute(),
    ]);

    const server = app.listen();
} catch (err) {
    console.log(err);
}
