import { App } from "./app";
import { UserRoute } from "./routes/user";
import { AuthRoute } from "./routes/auth.route";
import { ChatRoute } from "./routes/chat.route";
import { ChatroomRoute } from "./routes/chatroom.route";
import "reflect-metadata";

const app = new App([
    new UserRoute(),
    new ChatRoute(),
    new AuthRoute(),
    new ChatroomRoute(),
]);

app.listen();
