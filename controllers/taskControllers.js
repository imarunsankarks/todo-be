const Task = require("../schema/taskSchema");

// get all tasks
const getAll = async (req, res) => {
  try {
    const user = req.user._id;
    const tasks = await Task.find({ user }).sort({ createdAt: -1 });
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get one task
const getOne = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// post a task
const postTask = async (req, res) => {
  const { title, description, status, recurrence, deadline } =
    req.body;
  const user = req.user._id;
  try {
    const tasks = await Task.create({
      title,
      description,
      user,
      status,
      recurrence,
      deadline,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "No tasks found" });
    } else {
      res.status(200).json({ msg: "task deleted", task: task.title });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAll,
  getOne,
  postTask,
  deleteTask,
  updateTask,
};
