const { sequelize } = require('../models')
const User = require('../models').user
const Task = require('../models').task
const UserTask = require('../models').userTask

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)

    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ err })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll()

    res.status(200).json({ users })
  } catch (err) {
    res.status(500).json({ err })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ err })
  }
}

exports.createTask = async (req, res) => {
  try {
    sequelize.transaction(async transaction => {
      const task = await Task.create(
        { ...req.body, userId: req.params.userId },
        { include: [User], transaction }
      )

      const userTask = await UserTask.create(
        {
          userId: req.params.userId,
          taskId: task.id,
          status: req.body.status
        },
        { include: [User, Task], transaction }
      )

      res.status(200).json({ task, userTask })
    })
  } catch (err) {
    res.status(500).json({ err })
  }
}

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll(
      { where: { userId: req.params.userId } },
      { include: [User] }
    )

    res.status(200).json({ tasks })
  } catch (err) {
    res.status(500).json({ err })
  }
}

exports.getUserTaskById = async (req, res) => {
  try {
    const task = await Task.findOne(
      { where: { userId: req.params.userId, id: req.params.taskId } },
      { include: [User] }
    )

    res.status(200).json({ task })
  } catch (err) {
    res.status(500).json({ err })
  }
}
