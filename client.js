const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000/ws');

ws.on('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({ user: 'NodeClient', text: 'Hola desde Node!' }));
});

ws.on('message', (msg) => console.log('Message received:', msg.toString()));
