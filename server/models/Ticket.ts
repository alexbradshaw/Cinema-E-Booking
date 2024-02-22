import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";
import { Movie, Transaction } from './';

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
      type: DataTypes.STRING,
      allowNull: true,
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