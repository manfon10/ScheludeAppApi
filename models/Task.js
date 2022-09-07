const { mongoose } = require("../config/database");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
