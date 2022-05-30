const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const routing = require('./routes');
const { logs } = require('./configs/logs.config');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));

// --- CONNECT DATABASE ---
require('./configs/database.config');

// --- GENERAL MIDDLEWARES ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logs);

// --- SET HEADERS ---
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// --- USE API ROUTERS ---
app.use('/api', routing);

// --- EXPORTS ---
module.exports = app;
