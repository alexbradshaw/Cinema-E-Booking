import sequelize from "../config/connection.js";

import { Model, DataTypes } from 'sequelize';

class Admin extends Model {
    declare admin_id: number;

    declare manage_accounts: boolean;
    declare manage_admins: boolean;
    declare manage_categories: boolean;
    declare manage_movies: boolean;
    declare manage_promotions: boolean;
    declare refund: boolean;

}

Admin.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    manage_accounts: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    manage_admins: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    manage_categories: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    manage_movies: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    manage_promotions: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    refund: {
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