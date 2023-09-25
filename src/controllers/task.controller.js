import { sendHttpResponse } from "../utils/createResponse.js"
import { StatusCodes } from 'http-status-codes';
import taskFactory from '../services/task.service.js'
import logger from "../config/logger.js";

/**
 * 
 * @param {*} req taskId
 * @param {*} res task object fetched from DB for given ID.
 */
export const getTaskById = async (req, res) => {
  try{
    const {id: taskId} = req.query;
    logger.info(`getting task for Id: ${JSON.stringify(taskId)}`)
    const taskObj = await taskFactory.getTaskById(taskId);
    sendHttpResponse(res, taskObj)
  }catch(err){
    logger.error(`some error while fetching object ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

/**
 * 
 * @param {*} req The name and description to create a new task
 * @param {*} res return taskId, if created successfully.
 */
export const createTask = async (req, res) => {
  try{
    logger.info(`creating task for title: ${req.body.name}`)
    const taskObj = await taskFactory.createTask(req.body);
    sendHttpResponse(res, {taskId: taskObj.dataValues.id}, 'created successfully', StatusCodes.CREATED)
  }catch(err){
    logger.error(`some error while creating object ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

/**
 * 
 * @param {*} req taskId in params and an object to update status, name or description
 * @param {*} res 200 OK
 */
export const updateTask = async (req, res) => {
  try{
    const {id} = req.params;
    logger.info(`updating task for id: ${id}, body: ${JSON.stringify(req.body)}`)
    const taskObj = await taskFactory.updateTask({...req.body}, id);
    sendHttpResponse(res, {}, 'updated successfully', StatusCodes.OK)
  }catch(err){
    logger.error(`some error while updating object ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

/**
 * 
 * @param {*} req pageNumber
 * @param {*} res returns List of paginated tasks
 */
export const getAllTask = async (req, res) => {
  try{
    logger.info(`getting all task for`)
    const {pageNumber} = req.query;
    const taskObjs = await taskFactory.getAllTask(pageNumber);
    sendHttpResponse(res, {tasks:taskObjs}, 'fetched successfully', StatusCodes.OK)
  }catch(err){
    logger.error(`some error while fetching object ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res returns the metrics related to task status and dates.
 */
export const getTaskProgress = async (req, res) => {
  try{
    logger.info(`getting task progress metrics`)
    const taskMetrics = await taskFactory.getTaskMetrics();
    sendHttpResponse(res, taskMetrics, 'fetched successfully', StatusCodes.OK)
  }catch(err){
    logger.error(`some error while fetching metrics ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

