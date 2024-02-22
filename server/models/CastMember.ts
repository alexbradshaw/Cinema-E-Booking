import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection";
import { Movie, Person } from '.';

class CastMember extends Model {
    declare id: number;
}

CastMember.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'member',
  }
);

export default CastMember;