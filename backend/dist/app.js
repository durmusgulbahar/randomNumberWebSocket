"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
//import ErrorHandler from "./middleware/error-handler";
//import Database from "./config/db";
const dotenv_1 = __importDefault(require("dotenv"));
// import userRoutes from "./routes/user.routes";
// import taskRoutes from "./routes/task.routes";
// import authRoutes from "./routes/auth.routes";
const wsServer_service_1 = __importDefault(require("./services/wsServer.service"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "3000");
        this.httpServer = http_1.default.createServer(this.app);
        this.init();
    }
    init() {
        this.initConfig(); // starts db
        this.initMiddlewares();
        this.initRoutes();
        //this.initErrorHandling();
    }
    initConfig() {
        //new Database();
    }
    initMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        dotenv_1.default.config();
    }
    initRoutes() {
    }
    //   private initErrorHandling() {
    //     this.app.use(ErrorHandler.notFound);
    //     this.app.use(ErrorHandler.serverError);
    //   }
    listen() {
        const server = new wsServer_service_1.default(this.port);
        console.log(`WebSocket server is running on ws://localhost:${this.port}`);
        this.httpServer.listen(this.port + 5, () => {
            console.log(`HTTP server is running on http://localhost:${this.port + 5}`);
        });
    }
}
exports.default = App;
