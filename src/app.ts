import express from "express";
import { BaseController } from "./controllers/abstractions/base.controller";

class App {
  public app: express.Application;
  public port: number | string;

  constructor(controllers: BaseController[], port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: BaseController[]) {
    this.app.get("/", (req, res) => {
      res.send("Application is running");
    });
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port http://localhost:${this.port}`);
    });
  }
}

export default App;
