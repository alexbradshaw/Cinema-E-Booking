import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

import { Category, Movie } from './index.js';

class MovieCategory extends Model {
    declare id: number;
}

MovieCategory.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movieCategory',
  }
);

export default MovieCategory;