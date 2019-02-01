const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router
  .route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers)

router.route('/:id').get(UserController.getUserById)

router
  .route('/:userId/tasks')
  .post(UserController.createTask)
  .get(UserController.getUserTasks)

router.route('/:userId/tasks/:taskId').get(UserController.getUserTaskById)

module.exports = router
