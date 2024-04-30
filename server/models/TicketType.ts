import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

class TicketType extends Model {
    declare id: number;
}

TicketType.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ticketType',
  }
);

export default TicketType;