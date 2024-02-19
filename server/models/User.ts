import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from "../config/connection";

class User extends Model {
    declare id: number;
    declare isAdmin: boolean;
    declare username: string;
    declare password: string;

    async checkPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init(
  {
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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