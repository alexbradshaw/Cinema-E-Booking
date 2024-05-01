import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";
import { Movie, Seat, Transaction } from './index.js';
import TicketType from './TicketType.js';

class Ticket extends Model {
    declare id: number;
    declare ticket_seat_id: number;
}

Ticket.init(
  {
    ticket_seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Seat,
        key: 'id'
      }
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
    hooks: {
      afterBulkCreate: async (newTickets: Ticket[]) => {
        for (let i = 0; i < newTickets.length; i++) {
          await Seat.update({ ticket_id: newTickets[i].id }, { where: { id: newTickets[i].ticket_seat_id }});
        }
      },
      afterCreate: async (newTicket: Ticket) => {
        await Seat.update({ ticket_id: newTicket.id }, { where: { id: newTicket.ticket_seat_id }});
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ticket',
  }
);

export default Ticket;