import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";

class Movie extends Model {
    declare id: number;

}

Movie.init(
  {
    title: {
      type: DataTypes.STRING,
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
    coming_soon: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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