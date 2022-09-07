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
    const user = await User.findOne({ email }).populate("teams");

    return {
      succes: user ? true : false,
      data: user,
    };
  },

  getOneById: async (id) => {
    const user = await User.findOne({ id });

    return {
      succes: user ? true : false,
      data: user,
    };
  },
};

module.exports = usersServices;
