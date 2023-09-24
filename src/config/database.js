/* eslint-disable no-console */
import { Sequelize } from 'sequelize';
import constants from './constants.js';

const sequelize = new Sequelize(constants.DB_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;