const router = require('express').Router();
const projectController = require('./project.controller');

// Middleware
const authenticate = require('./../../middlewares/authenticate');


router.route('/')
    .get(authenticate, projectController.find)
    .post(authenticate, projectController.insert)

router.route('/add-todo/:projectId')
    .post(authenticate, projectController.addToDo)

router.route('/search')
    .get(authenticate, projectController.search)
    .post(authenticate, projectController.search)

router.route('/:id')
    .get(authenticate, projectController.findById)
    .put(authenticate, projectController.update)
    .delete(authenticate, projectController.remove)

module.exports = router;