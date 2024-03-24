import sequelize from "../config/connection.js";

import { Model, DataTypes } from 'sequelize';

class Admin extends Model {
    declare admin_id: number;

    declare manage_admins: boolean;
    declare create_promotion: boolean;
    declare disable_accounts: boolean;
    declare delete_accounts: boolean;

}

Admin.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    manage_admins: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    create_promotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    disable_accounts: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    delete_accounts: {
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