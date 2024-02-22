import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";
import Movie from './Movie';

class Category extends Model {
    declare id: number;
    declare movies: [Movie]
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

export default Category;