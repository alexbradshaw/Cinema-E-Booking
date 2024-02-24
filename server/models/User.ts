import bcrypt from 'bcrypt';
import sequelize from "../config/connection";

import { Model, DataTypes } from 'sequelize';

class User extends Model {
    declare id: number;
    declare isAdmin: boolean;
    declare username: string;
    declare password: string;

    declare create_promotion: boolean;
    declare permission2: boolean;
    declare permission3: boolean;
    declare permission4: boolean;

    async checkPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init(
  {
    isAdmin: {
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

export default User;