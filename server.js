const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A user connected.');

    ws.on('message', (message) => {
        // Forward the video data to all other clients (creator)
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('A user disconnected.');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
