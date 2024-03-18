import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

class Person extends Model {
    declare id: number;
}

Person.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    played: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'person',
  }
);

export default Person;