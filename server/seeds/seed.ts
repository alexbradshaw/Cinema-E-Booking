import sequelize from '../config/connection';
import { Movie, User } from '../models'

import users from './users.json';
import movies from './movies.json';

const seed = async () => {
    try {
        await sequelize.sync();
        await User.bulkCreate(users)

        console.log("Users Seeded");

        await Movie.bulkCreate(movies);

        console.log("Movies Seeded");

        process.exit(0);
    } catch (e) {
        console.error(e);
    }
}

seed();