import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";
import { Movie, Transaction } from './index.js';
import TicketType from './TicketType.js';

class Ticket extends Model {
    declare id: number;
}

Ticket.init(
  {
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TicketType,
        key: 'id'
      }
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Transaction,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ticket',
  }
);

export default Ticket;