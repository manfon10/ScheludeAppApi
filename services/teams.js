const Team = require("../models/Team");

const teamsServices = {
  getAll: async (userId) => {
    const teams = await Team.find({ users: { $in: [userId] } }).populate(
      "users"
    );

    return {
      data: teams,
      message: "Teams listed!",
      success: teams ? true : false,
    };
  },

  getById: async (id) => {
    const team = await Team.findById(id).populate("users");

    return {
      data: team,
      message: "Team listed!",
      success: team ? true : false,
    };
  },

  create: async (data, user) => {
    const newTeam = await Team.create({
      ...data,
      users: [user._id],
    });

    return {
      data: newTeam,
      message: "Team created!",
      success: newTeam ? true : false,
    };
  },
};

module.exports = teamsServices;
