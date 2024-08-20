import { Server } from 'ws';
import WebSocket from 'ws';
class WebSocketServer {
    private wss: Server;

    constructor(port: number) {
        this.wss = new Server({ port });
        this.initialize();
    }

    private initialize(): void {
        this.wss.on('connection', (ws) => {
            console.log('Client connected');
            this.sendRandomNumber(ws);

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }

    private sendRandomNumber(ws: WebSocket): void {
        setInterval(() => {
            const randomNumber = this.getRandom32BitInteger();
            ws.send(randomNumber.toString());
        }, 1000);
    }
    private getRandom32BitInteger(): number {
        const min = -Math.pow(2, 31); // -2,147,483,648
        const max = Math.pow(2, 31) - 1; // 2,147,483,647
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default WebSocketServer;
