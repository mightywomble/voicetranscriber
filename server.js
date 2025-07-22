// Import necessary modules
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Load the configuration file
const config = require('./config.json');

// Create an Express application
const app = express();

// Define the port to run on, using the value from the config file
const PORT = process.env.PORT || config.port;

// Serve static files (like your index.html) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// SSL certificate options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

// Create an HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running securely on https://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server.');
});
