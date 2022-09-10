const Team = require("../models/Team");
const usersServices = require("./users");
const tasksServices = require("./tasks");

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

  update: async (teamId, data) => {
    const updatedTeam = await Team.findOneAndUpdate(
      { _id: teamId },
      data,
      { new: true }
    );

    return {
      data: updatedTeam,
      message: "Team updated!",
      success: updatedTeam ? true : false,
    }
  },

  deleteTeam: async (teamId) => {
    const deletedTeam = await Team.findOneAndDelete({ _id: teamId });

    return {
      data: deletedTeam,
      message: "Team deleted!",
      success: deletedTeam ? true : false,
    }
  },

  addMember: async (teamId, email) => {
    const user = await usersServices.getOneByEmail(email);

    const team = await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { users: user.data._id } },
      { new: true }
    );

    return {
      data: team,
      message: "User added to the team!",
      success: team ? true : false,
    }
  },

  removeMember: async (teamId, email) => {
    const user = await usersServices.getOneByEmail(email);

    const team = await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { users: user.data._id } },
      { new: true }
    );

    return {
      data: team,
      message: "User added to the team!",
      success: team ? true : false,
    }
  },

  assignTaskToMember: async (teamId, taskData) => {
    const task = await tasksServices.createTask(taskData);

    const team = await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { tasks: task.data._id } },
      { new: true }
    );

    return {
      data: task,
      message: "Task created!",
      success: team ? true : false,
    }
  },

  deleteTeamTask: async (teamId, taskId) => {
    const task = await tasksServices.deleteTask(taskId);

    if (task.success) {
      const team = await Team.findOneAndUpdate(
        { _id: teamId },
        { $pull: { tasks: taskId } },
        { new: true }
      );

      if ( team) {
        return {
          message: "Task deleted!",
          success: true,
        }
      }
    }

    return {
      message: "Error!",
      success: false,
    }
  },
};

module.exports = teamsServices;
