const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const { getLocaleDate } = require('../utils');

// Middlewares to write logs in the 'access.log' file and also in the console
exports.logsInFile = morgan(`${getLocaleDate()} - :status - :method   :url - :referrer - :response-time[3]`, {
  stream: fs.createWriteStream(path.join(__dirname, '../', 'access.log'), { flags: 'a' }),
});

exports.logsInConsole = morgan('dev');
