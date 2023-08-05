const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
setTimeout(() => {
  ws.send("call_log");},5000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
