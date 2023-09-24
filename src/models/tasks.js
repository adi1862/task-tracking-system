import {Sequelize, DataTypes} from 'sequelize';
import { statusTypes } from './enums.js';
import sequelize from '../config/database.js';

export const Task = sequelize.define( '', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      default: statusTypes.OPEN
    }
  },
  {
    tableName: 'tasks',
    freezeTableName: true,
    timestamps: false
  }
);

