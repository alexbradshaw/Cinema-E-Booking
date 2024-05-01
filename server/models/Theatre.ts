import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";

class Theatre extends Model {
    declare id: number;
    declare isLarge: boolean;
}

Theatre.init(
  {
    isLarge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'theatre',
  }
);

export default Theatre;