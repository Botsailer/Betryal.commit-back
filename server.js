
const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
console.clear();
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    try {
      const data = JSON.parse(message);
      if (data.type === 'file') {
        saveFileData(data.fileData);
      } else if (data.type === 'text') {
        handleTextMessage(data.text);
      } else {
        console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
setTimeout(() => {
  ws.send("call_log");
}, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function saveFileData(fileData) {
  // Change the file path and name to where you want to save the uploaded file
  const filePath = './uploads/' + Date.now() + '.txt';

  // Write the file data to the file
  fs.writeFile(filePath, fileData, (err) => {
    if (err) {
      console.error('Error saving file:', err);
    } else {
      console.log('File saved:', filePath);
    }
  });
}

function handleTextMessage(text) {
  // Handle the received text message
  console.log('Received text message:', text);
}
