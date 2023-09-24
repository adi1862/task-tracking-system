import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';
import { validate } from 'express-validation';
import { validation } from '../validators/task.validator.js';

const routes = new Router();

routes.get('/all',
  taskController.getAllTask
);

routes.get('/metrics',
  taskController.getTaskProgress
);

routes.get('',
  validate(validation.get),
  taskController.getTaskById
);

routes.post('', 
  validate(validation.create), 
  taskController.createTask
);

routes.put('/:id', 
  taskController.updateTask
);


export default routes;
