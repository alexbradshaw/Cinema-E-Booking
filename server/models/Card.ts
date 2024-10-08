import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";
import bcrypt from 'bcrypt';
import User from './User.js';

class Card extends Model {
  declare card_id: number;
  declare card_number: string;
  declare last_four: string
  declare user_id: number;
}

Card.init(
  {
    card_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardholder_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [3, 3]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_four: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0000"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    hooks: {
      beforeBulkCreate: async (newCardData: Card[]) => {
        for (let i = 0; i < newCardData.length; i++) {
            newCardData[i].last_four = newCardData[i].card_number.trim().slice(-4);
            newCardData[i].card_number = await bcrypt.hash(newCardData[i].card_number, 10);
        }
      },
      beforeCreate: async (newCardData: Card) => {
          const count = await Card.count({ where: { user_id: newCardData.user_id } });
          if (count >= 3) {
            throw new Error('Cannot add more than 3 cards per user.');
          }
          newCardData.last_four = newCardData.card_number.trim().slice(-4);
          newCardData.card_number = await bcrypt.hash(newCardData.card_number, 10);
      },
      beforeUpdate: async (updatedCardData: Card) => {
          updatedCardData.last_four = updatedCardData.card_number.trim().slice(-4);
          updatedCardData.card_number = await bcrypt.hash(updatedCardData.card_number, 10);
      },
    },
    indexes: [
      {
        name: 'user',
        unique: true,
        fields: ['user_id']
      }
    ],
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'card',
  }
);

export default Card;