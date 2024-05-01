import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";
import { Showing } from './index.js';


class Seat extends Model {
    declare id: number;
    declare ticket_id: number | null;
    declare showing: Showing;
}

Seat.init(
  {
    row: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Showing,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'seat',
  }
);

export default Seat;