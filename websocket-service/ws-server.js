// websocket-service/ws-server.js
const WebSocket = require('ws');
const redis = require('redis');

const wss = new WebSocket.Server({ port: 3001 });
const redisSubscriber = redis.createClient({ url: 'redis://redis:6379' });

redisSubscriber.connect().then(() => {
  redisSubscriber.subscribe('new_message', (message) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

wss.on('connection', ws => {
  console.log('Client connesso al WebSocket');
});
