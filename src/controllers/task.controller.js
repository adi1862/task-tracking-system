import { sendHttpResponse } from "../utils/createResponse.js"
import { StatusCodes } from 'http-status-codes';
import taskFactory from '../services/task.service.js'
import logger from "../config/logger.js";

export const getTaskById = async (req, res) => {
  try{
    const {id: taskId} = req.query;
    logger.info(`getting task for Id: ${JSON.stringify(taskId)}`)
    const taskObj = await taskFactory.getTaskById(taskId);
    console.log(taskObj)
    sendHttpResponse(res, taskObj)
  }catch(err){
    logger.error(`some error while fetching object ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

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

export const updateTask = async (req, res) => {
  try{
    const {id} = req.params;
    logger.info(`updating task for id: ${id}, body: ${JSON.stringify(req.body)}`)
    const taskObj = await taskFactory.updateTask({...req.body}, id);
    console.log(taskObj)
    sendHttpResponse(res, {}, 'updated successfully', StatusCodes.OK)
  }catch(err){
    logger.error(`some error while updating object ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

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

export const getTaskProgress = async (req, res) => {
  try{
    logger.info(`getting task progress metrics`)
    const taskObjs = await taskFactory.getTaskMetrics();
    console.log(taskObjs)
    sendHttpResponse(res, {tasks:taskObjs}, 'fetched successfully', StatusCodes.OK)
  }catch(err){
    logger.error(`some error while fetching metrics ${JSON.stringify(err.message)}`)
    sendHttpResponse(res, {}, err.message, StatusCodes.INTERNAL_SERVER_ERROR) 
  }
}

