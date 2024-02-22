import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";

class Person extends Model {
    declare id: number;
}

Person.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
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