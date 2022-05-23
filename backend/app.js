const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

require('./configs/database.config');

// --- GENERAL MIDDLEWARES ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

// --- SET HEADERS ---
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api/auth/signup', (req, res, next) => {
  res.status(200).json({ message: 'ok' });
});
app.use('/api/auth/login', (req, res, next) => {
  res.status(200).json({ message: 'ok' });
});

// --- EXPORTS ---
module.exports = app;
