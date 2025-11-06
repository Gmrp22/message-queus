const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });
const cors = require('cors');
const PORT = 8000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

let messages = [
  { id: 1, user: 'Alice', text: 'Hello!' },
  { id: 2, user: 'Bob', text: 'Hi there!' },
];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});


wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');

  ws.on('message', (message) => {
    console.log('Received:', message);
    const parsed = JSON.parse(message);
    parsed.id = messages.length + 1;
    messages.push(parsed);

    // Broadcast a todos los clientes
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsed));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
