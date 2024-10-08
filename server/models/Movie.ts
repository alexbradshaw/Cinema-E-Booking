import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";
import { Person } from './index.js';

class Movie extends Model {
    declare id: number;
    declare title: string;
}

Movie.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vote_average: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Math.random() * (500 - 100) + 100) / 100
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starts_showing: {
      type: DataTypes.DATE,
      defaultValue: () => {
        const date = new Date();
        date.setMonth(date.getMonth() +  1)
        return date.getTime();
      },
      allowNull: false,
    },
    stops_showing: {
      type: DataTypes.DATE,
      defaultValue: () => {
        const date = new Date();
        date.setMonth(date.getMonth() +  2)
        return date.getTime();
      },
      allowNull: false,
    },
    director_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: 'id'
      }
    },
    producer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: 'id'
      }
    },
  },
  {
    indexes: [
      {
        name: 'titles',
        fields: ['title']
      }
    ],
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

export default Movie;