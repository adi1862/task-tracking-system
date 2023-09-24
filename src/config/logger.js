import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  handleExceptions: true
});

export default logger;