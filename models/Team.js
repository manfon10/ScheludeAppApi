const { mongoose } = require("../config/database");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  users: [{
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  }],
  tasks: [{
    ref: "Task",
    type: mongoose.Schema.Types.ObjectId
  }]
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
