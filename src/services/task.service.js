import { Sequelize } from 'sequelize';
import {Task} from '../models/tasks.js';
import sequelize from '../config/database.js';
import _ from 'lodash';
import { statusTypes } from '../models/enums.js';
import constants from '../config/constants.js';

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

const PAGE_SIZE = constants.PAGE_SIZE;
const getAllTask = async (pageNumber=0) => {
  return Task.findAll({ offset: (pageNumber-1)*PAGE_SIZE, limit: PAGE_SIZE })
}

const getTaskMetrics = async () => {
  // get aggregated values for status
  const statusWiseProgress = await Task.findAll(
    {
      group: 'status',
      attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']]
    },
  );

  // get date wise aggregated tasks
  let dateWiseProgress = await sequelize.query(
    `
      SELECT status, DATE(created_at) date, COUNT(status) count 
      FROM tasks 
      GROUP BY status, DATE(created_at)
      ORDER BY DATE(created_at);
    `
  )
  dateWiseProgress = dateWiseProgress[0];
  const statusWiseProgressResponse = {open_tasks:0, inprogress_tasks:0, completed_tasks:0};
  // using loadash to transform into desired response structure
  statusWiseProgressResponse.open_tasks = _getAggregatedCountForStatusForObj(statusWiseProgress, statusTypes.OPEN)
  statusWiseProgressResponse.inprogress_tasks = _getAggregatedCountForStatusForObj(statusWiseProgress, statusTypes.INPROGRESS)
  statusWiseProgressResponse.completed_tasks = _getAggregatedCountForStatusForObj(statusWiseProgress, statusTypes.COMPLETED)
  
  dateWiseProgress = _.groupBy(dateWiseProgress, dateWiseProgress => dateWiseProgress.date)
  const dateWiseProgressResponse = [];
  // massaging data to align with the required response
  for(var key in dateWiseProgress ){
    const res = {
      date: key,
      metrics: {
        open_tasks: _getAggregatedCountForStatus(dateWiseProgress[key], statusTypes.OPEN),
        inprogress_tasks: _getAggregatedCountForStatus(dateWiseProgress[key], statusTypes.INPROGRESS),
        completed_tasks: _getAggregatedCountForStatus(dateWiseProgress[key], statusTypes.COMPLETED)
      }
    }
    dateWiseProgressResponse.push(res)
  }
  return {metrics: statusWiseProgressResponse, dateWiseMetrics: dateWiseProgressResponse};
}

const _getAggregatedCountForStatusForObj = (iterableList, status) => {
  const filteredList = _.filter(iterableList, (progress) => progress.getDataValue('status') == status);
  if(filteredList[0])return filteredList[0].getDataValue('count');
  return 0;
}

const _getAggregatedCountForStatus = (iterableList, status) => {
  const filteredList = _.filter(iterableList, (progress) => progress.status == status);
  if(filteredList[0])return filteredList[0]?.count
  return 0;
}
export default {
  getTaskById,
  createTask,
  updateTask,
  getAllTask,
  getTaskMetrics
};