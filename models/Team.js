const { mongoose } = require("../config/database");

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  users: [{
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  }]
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
