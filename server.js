// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['keys1']
}))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const homeRoutes = require("./routes/homepage");
const registerRoutes = require("./routes/register");
const profileRoutes = require("./routes/profile");
const loginRoutes = require("./routes/login");
const createRoutes = require("./routes/create");
const resourceRoutes = require("./routes/resource");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", homeRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/profile", profileRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/create", createRoutes(db));
app.use("/resource", resourceRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
