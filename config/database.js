const mongoose = require("mongoose");
const { dbUser, dbPassword, dbHost, dbName } = require(".");

const connection = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );

  console.log("Mongo DB connected:");
};

module.exports = { connection, mongoose };
