import taskRoutes from './tasks.routes.js';
import { Router } from 'express';

const routes = new Router();

routes.use('/task', taskRoutes);


export default routes;
