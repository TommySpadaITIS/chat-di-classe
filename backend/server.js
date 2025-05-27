// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/messages', messageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server avviato sulla porta ${PORT}`);
});
