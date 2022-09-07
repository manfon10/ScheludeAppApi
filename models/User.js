const { mongoose } = require("../config/database");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

userSchema.virtual('teams', {
  ref: "Team",
  foreignField: "users",
  localField: "_id",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
