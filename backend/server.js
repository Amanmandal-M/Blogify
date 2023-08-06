const express = require('express');
require('dotenv').config();

// Config Location
const { SeqConnection } = require('./configs/db');

// Routes Location

// Middleware Location

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center;color:blue;">Welcome to the Blogify App Backend</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await SeqConnection.authenticate();
    console.log(`Server is listening on PORT: ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
});
