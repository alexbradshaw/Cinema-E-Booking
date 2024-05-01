import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

import { User } from './index.js';

class Promotion extends Model {
    declare id: number;
    declare title: string;
    declare discount_value: number;
    declare condition: number;
}

Promotion.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    condition: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => {
        const date = new Date()
        date.setMonth((date.getMonth() + 1) % 12)
        return date
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'promotion',
  }
);

export default Promotion;