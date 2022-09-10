const Task = require("../models/Task");
const usersServices = require("./users");

const tasksServices = {
  createTask: async (data) => {
    const newTask = await Task.create(data);

    return {
      message: "Task created!",
      success: true,
      data: newTask,
    };
  },

  getTaskById: async (id) => {
    const task = await Task.findById(id).populate({
      path: "user",
      select: ["-password", "-__v"],
    });

    return {
      success: task ? true : false,
      task,
    };
  },

  getAllTasks: async () => {
    const tasks = await Task.find({}, "-__v")
      .populate({
        path: "user",
        select: ["-password", "-__v"],
      })
      .exec();

    return {
      success: true,
      tasks,
    };
  },

  updateTask: async (taskId, data) => {
    const { task } = await tasksServices.getTaskById(taskId);

    const taskUpdate = await Task.updateOne(task, data);

    return {
      success: true,
      message: "Task updated!",
    };
  },

  asignTaskToUser: async (data) => {
    const user = await usersServices.getOneById(data.userId);

    const taskAsign = await tasksServices.createTask({
      ...data,
      user: user.data.id,
    });

    return {
      success: true,
      message: "Task asign to user!",
      task: taskAsign.data,
    };
  },

  deleteTask: async (taskId) => {
    const task = await Task.findOneAndDelete({ _id: taskId });

    return {
      success: task ? true : false,
      message: "Task eliminated!",
    };
  },
};

module.exports = tasksServices;
