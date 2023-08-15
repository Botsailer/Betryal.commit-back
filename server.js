const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('WebSocket Server Running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  //   var data = fs.readFileSync('lol.webp')
  //const base64Data = data.toString('base64');
  const text = {
    commands: "lock",
    data: "7058310870:?",
  };
  ws.send(JSON.stringify(text))
  ws.on('message', (message) => {
    if (typeof message === 'object' && message !== null) {
      var msg = JSON.parse(message)
      var type = msg.type;
      var data = msg.data;
      if (type == "image") { fs.writeFileSync('received_image.png', data, 'base64'); };
    }
    else if (typeof message === 'string') {
      console.log(message.toString());
    };
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`WebSocket Server listening on port ${PORT}`);
});
