import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";
import { Promotion } from './';

class Transaction extends Model {
    declare id: number;
}

Transaction.init(
  {
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Promotion,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction',
  }
);

export default Transaction;