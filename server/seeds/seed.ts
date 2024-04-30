import sequelize from '../config/connection.js';

import { Admin, Category, Card, CastMember, MovieCategory, Movie, Person, Promotion, Ticket, TicketType, Transaction, User, } from '../models/index.js';
import { admins, cards, categories, members, movieCategories, movies, persons, promotions, tickets, ticketTypes, transactions, users } from './index.js';

const seed = async () => {
    try {
        await sequelize.sync({ force: true });

        await Admin.bulkCreate(admins);
        console.log('Admins Seeded');

        await Person.bulkCreate(persons);
        console.log('Persons Seeded');

        await Movie.bulkCreate(movies);
        console.log('Movies Seeded');

        await User.bulkCreate(users);
        console.log('Users Seeded');

        await Card.bulkCreate(cards);
        console.log('Cards Seeded');

        await Category.bulkCreate(categories);
        console.log('Categories Seeded');

        await CastMember.bulkCreate(members);
        console.log('Person Join Table Seeded');

        await MovieCategory.bulkCreate(movieCategories);
        console.log('Category Join Table Seeded');

        await Promotion.bulkCreate(promotions);
        console.log('Promotions Seeded');

        await Transaction.bulkCreate(transactions);
        console.log('Transactions Seeded');

        await TicketType.bulkCreate(ticketTypes);
        console.log('Tickets Seeded');

        await Ticket.bulkCreate(tickets);
        console.log('Tickets Seeded');

        process.exit(0);
    } catch (e) {
        console.error(e);
    }
}

seed();