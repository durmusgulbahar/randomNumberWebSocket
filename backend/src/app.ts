import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
//import ErrorHandler from "./middleware/error-handler";
//import Database from "./config/db";
import dotenv from "dotenv";
// import userRoutes from "./routes/user.routes";
// import taskRoutes from "./routes/task.routes";
// import authRoutes from "./routes/auth.routes";
import WebSocketServer from "./services/wsServer.service";
dotenv.config();
class App {
  private readonly app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");
    this.init();
  }

  private init() {
    this.initConfig(); // starts db
    this.initMiddlewares();
    this.initRoutes();
    //this.initErrorHandling();
  }

  private initConfig() {
    //new Database();
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    dotenv.config();
  }

  private initRoutes() {
    
  }

//   private initErrorHandling() {
//     this.app.use(ErrorHandler.notFound);
//     this.app.use(ErrorHandler.serverError);
//   }

  public listen() {
  
    const server = new WebSocketServer(this.port);
    
    console.log(`WebSocket server is running on ws://localhost:${this.port}`);
  }
}

export default App;
