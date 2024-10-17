const WebSocket = require('ws');

// Create a WebSocket server bound to port 8080
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a welcome message to the client
  ws.send('Welcome to SkyMetrics WebSocket server!');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Function to broadcast messages to all connected clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

module.exports = { wss, broadcast };
