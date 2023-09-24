
import { StatusCodes } from 'http-status-codes';

export const sendHttpResponse = (res, data = {}, message='success', statusCode = StatusCodes.OK) =>{
  res.status(statusCode).json({
    message,
    data
  });
}
