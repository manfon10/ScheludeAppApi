const express = require("express");

const { catchAsync } = require("../helpers/catchAsync");

const tasksServices = require("../services/tasks");
const authServices = require("../services/auth");

const {
  createTask,
  getAllTasks,
  updateTask,
  getTaskById,
  asignTaskToUser,
  deleteTask,
} = tasksServices;
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
  "/",
  catchAsync(async ({ body }, res) => {
    const result = await getAllTasks();

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await getTaskById(id);

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.post(
  "/",
  catchAsync(async ({ body, sessionUser }, res) => {
    const result = await createTask({ ...body, user: sessionUser.id });

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.post(
  "/:taskId",
  catchAsync(async ({ body }, res) => {
    const result = await asignTaskToUser(body);

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.patch(
  "/:id",
  catchAsync(async ({ body, params }, res) => {
    const { id } = params;

    const result = await updateTask(id, body);

    return res.status(result.success ? 200 : 400).json(result);
  })
);

router.delete(
  "/:id",
  catchAsync(async ({ params }, res) => {
    const { id } = params;

    const result = await deleteTask(id);

    return res.status(result.success ? 200 : 400).json(result);
  })
);

module.exports = { taskRouter: router };
