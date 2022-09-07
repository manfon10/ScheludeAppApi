const Task = require("../models/Task");

const tasksServices = {
  createTask: async (data) => {
    const newTask = await Task.create(data);

    return {
      message: "Task created!",
      success: true,
      data: newTask,
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
};

module.exports = tasksServices;
