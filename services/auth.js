const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { catchAsync } = require("../helpers/catchAsync");

const { jwtSecret, jwtExpires } = require("../config");

const usersServices = require("./users");

const authServices = {
  signup: async (data) => {
    if (!data.email || !data.password) {
      return {
        message: "incomplete data!",
        succes: false,
      };
    }

    data.password = await authServices.hassPassword(data.password);

    const newUser = await usersServices.createUser(data);

    newUser.data.password = undefined;

    return {
      success: true,
      message: newUser.message,
      data: newUser.data,
    };
  },

  login: async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      return {
        message: "incomplete data!",
        success: false,
      };
    }

    const user = await usersServices.getOneByEmail(email);

    if (
      !user ||
      !(await authServices.comparePassword(password, user.data.password))
    ) {
      return {
        message: "Invalid credentials!",
        success: false,
      };
    }

    user.data.password = undefined;

    return {
      success: true,
      data: user.data,
      ...authServices.generateAuthData(user),
    };
  },

  generateAuthData: (userData) => {
    const user = { id: userData._id };
    return {
      token: authServices.generateToken(user),
    };
  },

  comparePassword: (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
  },

  hassPassword: (password) => {
    return bcrypt.hash(password, 12);
  },

  generateToken: (data) => {
    return jwt.sign(data, jwtSecret, {
      expiresIn: jwtExpires,
    });
  },
};

module.exports = authServices;
