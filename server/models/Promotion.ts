import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";

import { User } from './';

class Promotion extends Model {
    declare id: number;
}

Promotion.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
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
      defaultValue: DataTypes.NOW
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