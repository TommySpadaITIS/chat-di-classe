// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const redisClient = require('../redisclient');

router.post('/', async (req, res) => {
  const { nickname, message } = req.body;
  if (!nickname || !message) {
    return res.status(400).json({ error: 'Nickname e messaggio sono richiesti.' });
  }

  const timestamp = new Date().toISOString();
  const msgObj = { nickname, message, timestamp };
  await redisClient.lPush('chat_messages', JSON.stringify(msgObj));
  await redisClient.publish('new_message', JSON.stringify(msgObj));

  res.status(200).json({ success: true });
});

module.exports = router;
