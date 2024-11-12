const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let onlineUsers = [];

app.use(express.json());
app.use(express.static('public'));

app.post('/addUser', (req, res) => {
    const { username } = req.body;
    const vulnerabilityScore = Math.floor(Math.random() * 100) + 1;
    const user = { username, score: vulnerabilityScore };

    onlineUsers.push(user);
    broadcast({ type: 'newUser', user });
    res.status(200).send('User added successfully');
});

app.post('/disconnectUser', (req, res) => {
    const { username } = req.body;
    onlineUsers = onlineUsers.filter(user => user.username !== username);
    broadcast({ type: 'userDisconnected', username });
    res.status(200).send('User disconnected');
});

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ type: 'init', users: onlineUsers }));

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});