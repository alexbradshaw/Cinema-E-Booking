import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";
import bcrypt from 'bcrypt';
import { User } from './';

class Card extends Model {
  declare id: number;
  declare card_number: string;
}

Card.init(
  {
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
  },
  {
    hooks: {
      beforeBulkCreate: async (newCardData: Card[]) => {
        for (let i = 0; i < newCardData.length; i++) {
            newCardData[i].card_number = await bcrypt.hash(newCardData[i].card_number, 10);
        }
      },
      beforeCreate: async (newCardData: Card) => {
          newCardData.card_number = await bcrypt.hash(newCardData.card_number, 10);
      },
      beforeUpdate: async (updatedCardData: Card) => {
          updatedCardData.card_number = await bcrypt.hash(updatedCardData.card_number, 10);
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'card',
  }
);

export default Card;