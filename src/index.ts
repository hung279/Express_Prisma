import App from "./app";
import dotenv from "dotenv";
import UserController from "./controllers/user.controller";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = new App([new UserController()], PORT);

app.listen();