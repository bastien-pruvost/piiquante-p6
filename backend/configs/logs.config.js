const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Create a writable stream in a 'access.log' file for request logs
const accesLogStream = fs.createWriteStream(path.join(__dirname, '../', 'access.log'), { flags: 'a' });

// Function to get date and time in custom format for logs
const getLocaleDate = () => {
  const today = new Date();
  const DD = String(today.getDate()).padStart(2, '0');
  const MM = String(today.getMonth() + 1).padStart(2, '0');
  const YYYY = today.getFullYear();
  const HH = today.getHours();
  const mm = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

  return `${DD}/${MM}/${YYYY}-${HH}h${mm}`;
};

// Middlewares to write logs in the 'access.log' file and also in the console
exports.logs = [
  morgan(`${getLocaleDate()} - :status - :method   :url - :referrer - :response-time[3]`, {
    stream: accesLogStream,
  }),
  morgan('dev'),
];
