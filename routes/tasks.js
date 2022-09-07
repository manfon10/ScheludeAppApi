const express = require("express");

const { catchAsync } = require("../helpers/catchAsync");

const tasksServices = require("../services/tasks");
const authServices = require("../services/auth");

const { createTask, getAllTasks } = tasksServices;
const { protectToken } = authServices;

const router = express.Router();

// Routes Protected

router.use(
  catchAsync(async (req, res, next) => {
    const result = await protectToken(req);

    req.sessionUser = result.user.data;

    next();
  })
);

router.get(
  "/get_all_tasks",
  catchAsync(async ({ body }, res) => {
    const result = await getAllTasks();

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.post(
  "/create_task",
  catchAsync(async ({ body, sessionUser }, res) => {
    const result = await createTask({ ...body, user: sessionUser.id });

    return res.status(result.success ? 200 : 400).json(result);
  })
);

module.exports = { taskRouter: router };
