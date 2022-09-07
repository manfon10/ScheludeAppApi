// Init Libs
const express = require("express");
const cors = require("cors");

// Utils

// Routes
const { authRouter } = require("./routes/auth");
const { taskRouter } = require("./routes/tasks");
const { teamsRouter } = require("./routes/teams");

// Init express app
const app = express();

// Enable cors
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

//Endpoints
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/teams", teamsRouter);

module.exports = { app };
