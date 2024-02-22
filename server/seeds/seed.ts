import sequelize from '../config/connection';

import { Category, CastMember, MovieCategory, Movie, Person, Promotion, Ticket, Transaction, User } from '../models';
import { categories, members, movieCategories, movies, persons, promotions, tickets, transactions, users } from './';

const seed = async () => {
    try {
        await sequelize.sync({force: true});

        await Person.bulkCreate(persons);
        console.log("Persons Seeded");

        await Movie.bulkCreate(movies);
        console.log("Movies Seeded");

        await User.bulkCreate(users);
        console.log("Users Seeded");

        await Category.bulkCreate(categories);
        console.log("Categories Seeded");

        await CastMember.bulkCreate(members);
        console.log("Person Join Table Seeded");

        await MovieCategory.bulkCreate(movieCategories);
        console.log("Category Join Table Seeded");

        await Promotion.bulkCreate(promotions);
        console.log("Promotions Seeded");

        await Transaction.bulkCreate(transactions);
        console.log("Transactions Seeded");

        await Ticket.bulkCreate(tickets);
        console.log("Tickets Seeded");

        process.exit(0);
    } catch (e) {
        console.error(e);
    }
}

seed();