
import { Joi } from 'express-validation';

export const validation = {
  create: {
    body: Joi.object({
      name: Joi.string().min(3).max(20).required().messages({
        'string.empty': 'Task title is required'
      }),
      description: Joi.string()
    })
  },
  get: {
    query: Joi.object({
      id: Joi.number().required()
    })
  }
};