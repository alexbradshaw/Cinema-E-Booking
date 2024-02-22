import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";
import Person from './Person';

class Movie extends Model {
    declare id: number;
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

export default Movie;