import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/connection.js";
import { Movie, Seat, Theatre } from './index.js';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const generateRows = async (size: number, showing_id: number) => {
  for (let j = 0; j < size; j++) {
    await Seat.create({ row: rows[Math.floor(j/10)], number: j % 10, showing_id})
  }
}

class Showing extends Model {
    declare id: number;
    declare theatre_id: number;
}

Showing.init(
  {
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    theatre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Theatre,
        key: 'id'
      }
    },
  },
  {
    hooks: {
      afterBulkCreate: async (newShowingData: Showing[]) => {
        for (let i = 0; i < newShowingData.length; i++) {
            const theatre = await Theatre.findByPk(newShowingData[i].theatre_id);

            let size;
            if (theatre?.isLarge) {
              size = 80
            } else {
              size = 40
            }

            await generateRows(size, newShowingData[i].id);
        }
      },
      afterCreate: async (newShowingData: Showing) => {
        const theatre = await Theatre.findByPk(newShowingData.theatre_id);
        await generateRows(theatre?.isLarge ? 64 : 32, newShowingData.id);
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'showing',
  }
);

export default Showing;