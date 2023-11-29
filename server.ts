import { App } from "./app";
import { AccountRoute } from "./routes/account.route";
import { AuthRoute } from "./routes/auth.route";
import { ChatRoute } from "./routes/chat.route";
import { ChatroomRoute } from "./routes/chatroom.route";

const app = new App([
    new AccountRoute(),
    new ChatRoute(),
    new AuthRoute(),
    new ChatroomRoute(),
]);

app.listen();
