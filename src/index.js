/* eslint-disable no-console */
import express from 'express';
import './config/database.js';
import middlewaresConfig from './config/middlewares.js';
import constants from './config/constants.js';
import ApiRoutes from './routes/index.js';
import winstonInstance from './config/logger.js';
import expressWinston from 'express-winston';


const app = express();

middlewaresConfig(app);

app.use('/api', ApiRoutes);
app.use(
  expressWinston.logger({
    winstonInstance,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  })
);
app.listen(constants.PORT, err => {
  if (err) {
    console.log('Cannot run!');
  } else {
    console.log(
      `
      Trackii API server listening on port: ${constants.PORT} 🍕
      Env: ${process.env.NODE_ENV} 🦄
    `
    );
  }
})

export default app;
