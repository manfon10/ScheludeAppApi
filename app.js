// Init Libs

const express = require("express");
const cors = require("cors");

// Utils

// Routes

// Init express app
const app = express();

// Enable cors
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

module.exports = { app };
