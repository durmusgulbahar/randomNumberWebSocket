import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import http from 'http';
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
  private readonly httpServer: http.Server;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");
    this.httpServer = http.createServer(this.app);
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
    
    this.httpServer.listen(this.port + 5, () => {
      console.log(`HTTP server is running on http://localhost:${this.port + 5}`);
  });
  }
}

export default App;
