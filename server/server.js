// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/heartsync';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection disconnected through app termination');
  process.exit(0);
});

// Define MongoDB Schema and Model
const linkSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  theme: { type: String, required: true, enum: ['love', 'lust', 'crush', 'bff'] },
  token: { type: String, required: true, unique: true },
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

// API Routes
app.post('/api/create-link', async (req, res) => {
  try {
    const { name, theme } = req.body;

    if (!name || !theme) {
      return res.status(400).json({ error: 'Name and theme are required' });
    }

    const token = crypto.randomBytes(16).toString('hex');

    const newLink = new Link({ name, theme, token });
    await newLink.save();

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Error creating link' });
  }
});

app.get('/api/connect/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const link = await Link.findOne({ token });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ name: link.name, theme: link.theme });
  } catch (error) {
    console.error('Error fetching link data:', error);
    res.status(500).json({ error: 'Error fetching link data' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});