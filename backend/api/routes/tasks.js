const express = require('express');
const Task = require("../routes/models/task"); // model zadania
const router = express.Router();
const TasksController = require('../controllers/tasks');
const checkAuth =require('../middleware/checkAuth'); // autoryzacja jwt


router.get('/', TasksController.tasks_get_all); // wszytskie zadania

router.post('/',checkAuth,  TasksController.tasks_add_new); // dodanie nowego zadania

router.get('/:id',checkAuth, TasksController.tasks_get_by_id); // wyswietlenie konktrenego zadania

router.put('/:id',checkAuth, TasksController.tasks_change); // aktualizacja zadania

router.delete('/:id',checkAuth, TasksController.tasks_delete); // usuniecie zadania



module.exports = router;