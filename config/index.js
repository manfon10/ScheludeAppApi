const process = require("dotenv").config();

const config = {
  port: process.parsed.PORT,
  dbHost: process.parsed.DB_HOST,
  dbUser: process.parsed.DB_USER,
  dbPassword: process.parsed.DB_PASS,
  dbName: process.parsed.DB_NAME,
  jwtSecret: process.parsed.JWT_SECRET,
  jwtExpires: process.parsed.JWT_EXPIRES_IN,
};

module.exports = config;
