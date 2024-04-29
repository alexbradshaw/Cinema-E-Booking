import bcrypt from 'bcrypt';
import sequelize from "../config/connection.js";

import { Model, DataTypes } from 'sequelize';
import { Admin, Card } from './index.js';

class User extends Model {
    declare id: number;
    declare admin_id: number;
    declare email: string;
    declare username: string;
    declare password: string;
    declare active: boolean;
    declare token: string;
    declare token_identifier: string;

    declare admin?: Admin;
    declare card?: Card;

    async checkPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init(
  {
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 4,
      },
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    promotion_enrollment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    token_identifier: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Admin,
        key: 'admin_id'
      }
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Card,
        key: 'card_id',
      },
      onDelete: 'SET NULL'
    },
  },
  {
  hooks: {
    beforeBulkCreate: async (newUserData: User[]) => {
      for (let i = 0; i < newUserData.length; i++) {
          newUserData[i].password = await bcrypt.hash(newUserData[i].password, 10);
      }
    },
    beforeCreate: async (newUserData: User) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
    },
    beforeUpdate: async (updatedUserData: User) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    },
  },
  indexes: [
    {
      name: 'emails',
      unique: true,
      fields: ['email', 'username']
    }
  ],
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

export default User;