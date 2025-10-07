// COMP3123 - Exec05
// Author: Minilik Meja (Student ID: 100516804)
// Purpose: Express routes project with MongoDB Atlas, static file serving, and error handling

require('dotenv').config();                 // <<< load .env first

const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5051;

// Read Mongo URI from .env
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set. Create a .env file with MONGO_URI=...');
  process.exit(1);
}

app.use(express.json());

// ===== MongoDB Atlas Connection =====
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// ===== 1) /home — Serve home.html =====
app.get('/home', (req, res, next) => {
  const filePath = path.join(__dirname, 'home.html');
  res.sendFile(filePath, err => err && next(err));
});

// Helper: read user.json
function readUserData() {
  const filePath = path.join(__dirname, 'user.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// ===== 2) /profile — Return user.json =====
app.get('/profile', (req, res, next) => {
  try {
    const user = readUserData();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// ===== 3) /login — Validate username/password =====
app.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const user = readUserData();

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }
    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }
    return res.json({ status: true, message: 'User Is valid' });
  } catch (err) {
    next(err);
  }
});

// ===== 4) /logout/:username — HTML message =====
app.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

// ===== 5) Error-handling middleware (return 500) =====
app.use((err, req, res, next) => {
  console.error('Error handler:', err);
  res.status(500).send('Server Error');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
