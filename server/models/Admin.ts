import sequelize from "../config/connection";

import { Model, DataTypes } from 'sequelize';

class Admin extends Model {
    declare admin_id: number;

    declare create_promotion: boolean;
    declare permission2: boolean;
    declare permission3: boolean;
    declare permission4: boolean;

}

Admin.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    create_promotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permission2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permission3: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permission4: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'admin',
  }
);

export default Admin;