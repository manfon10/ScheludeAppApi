const { mongoose } = require("../config/database");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
