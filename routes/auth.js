const express = require("express");

const { catchAsync } = require("../helpers/catchAsync");

const authServices = require("../services/auth");

const { login, signup } = authServices;

const router = express.Router();

router.post(
  "/login",
  catchAsync(async ({ body }, res) => {
    const result = await login(body);

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.post(
  "/signup",
  catchAsync(async ({ body }, res) => {
    const result = await signup(body);

    return res.status(result.success ? 200 : 400).json(result);
  })
);

module.exports = { authRouter: router };
