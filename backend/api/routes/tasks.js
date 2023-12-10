const express = require('express');
const Task = require("../routes/models/task");
const router = express.Router();
const TasksController = require('../controllers/tasks');
const checkAuth =require('../middleware/checkAuth'); 


router.get('/',TasksController.tasks_get_all);

router.post('/',checkAuth,  TasksController.tasks_add_new);

router.get('/:id',checkAuth, TasksController.tasks_get_by_id);

router.put('/:id',checkAuth, TasksController.tasks_change);

router.delete('/:id',checkAuth, TasksController.tasks_delete);



module.exports = router;