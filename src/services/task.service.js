import { Sequelize } from 'sequelize';
import {Task} from '../models/tasks.js';
import sequelize from '../config/database.js';

const getTaskById = async (taskId) => {
  /** 
   * SELECT * FROM tasks; 
   * */
  return Task.findByPk(taskId);
}

const createTask = async (payload) => {
  /**
   * INSERT INTO tasks (name, description, created_by) VALUES (?,?,?);
   */
  return Task.create(
    {
      ...payload
    }
  )
}

const updateTask = async (payload, id) => {
  /**
   * UPDATE tasks SET status='INPROGRESS' WHERE id=?;
   */
  return Task.update(
    {
      ...payload
    },
    {
      where:{id}
    },
  )
}

const PAGE_LIMIT = 10
const getAllTask = async (pageNumber=0) => {
  return Task.findAll({ offset: (pageNumber-1)*PAGE_LIMIT, limit: PAGE_LIMIT })
}

const getTaskMetrics = async () => {
  // get aggregated values for status
  // SELECT `status`, DATE('created_at'), COUNT('status') AS `count` 
  // FROM `tasks` AS `model` GROUP BY `status`, DATE('created_at');
  const findStatusWiseProgress = await Task.findAll(
    {
      group: 'status',
      attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']]
    },
  );
  console.log(findStatusWiseProgress)
  // get date wise aggregated tasks
  // const findDateWiseProgress = await Task.findAll( {
  //   group: ['status', Sequelize.fn('DATE','created_at')],
  //   attributes: ['status', Sequelize.fn('DATE','created_at'), [Sequelize.fn('COUNT', 'status'), 'count']]
  // })
  const findDateWiseProgress = await sequelize.query(
    `
      SELECT status, DATE('created_at') date, COUNT('status') count 
      FROM tasks 
      GROUP BY status, DATE('created_at');
    `,
    {
      model: Task,
      mapToModel: true
    }
  )
  console.log(findDateWiseProgress)
}
export default {
  getTaskById,
  createTask,
  updateTask,
  getAllTask,
  getTaskMetrics
};