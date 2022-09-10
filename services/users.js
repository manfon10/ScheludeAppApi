const User = require("../models/User");

const usersServices = {
  createUser: async (data) => {
    const newUser = await User.create(data);

    return {
      data: newUser,
      message: "User created!",
      success: true,
    };
  },

  getOneByEmail: async (email) => {
    const user = await User.findOne({ email });

    return {
      succes: user ? true : false,
      data: user,
    };
  },

  getOneById: async (id) => {
    const user = await User.findById(id);

    return {
      succes: user ? true : false,
      data: user,
    };
  },

  deleteTask: async (taskId) => {},
};

module.exports = usersServices;
