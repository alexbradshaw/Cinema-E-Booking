import { Sequelize } from "sequelize";
import 'dotenv/config';
import password from "../utils/env.js"

let sequelize: Sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'CinemaEBooking',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || password || '',
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

export default sequelize;