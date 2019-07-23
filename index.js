const express = require('express'); // Import express
const routes = require('./routes'); // Import snippets router

const app = express(); // Create our app

/* Middleware */
app.use(express.json()); // parses incoming requests with JSON payloads

/* Routing */
app.use('/', routes); // use snippets router

const PORT = process.env.PORT || 5000; // get the port from process.env or use 5000 as default
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // run the app
