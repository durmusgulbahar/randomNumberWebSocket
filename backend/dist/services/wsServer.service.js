"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
class WebSocketServer {
    constructor(port) {
        this.wss = new ws_1.Server({ port });
        this.initialize();
    }
    initialize() {
        this.wss.on('connection', (ws) => {
            console.log('Client connected');
            this.sendRandomNumber(ws);
            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }
    sendRandomNumber(ws) {
        setInterval(() => {
            const randomNumber = this.getRandom32BitInteger();
            ws.send(randomNumber.toString());
        }, 1000);
    }
    getRandom32BitInteger() {
        const min = -Math.pow(2, 31); // -2,147,483,648
        const max = Math.pow(2, 31) - 1; // 2,147,483,647
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.default = WebSocketServer;
