import Admin from './Admin';
import Category from './Category';
import CastMember from './CastMember';
import Movie from './Movie';
import MovieCategory from './MovieCategory';
import Person from './Person';
import Promotion from './Promotion';
import Ticket from './Ticket';
import Transaction from './Transaction';
import User from './User';

/* Setting up Model Relation to Allow Search by Categories */
    /* Associating Movies and Categories together */
    Movie.belongsToMany(Category, {
        through: MovieCategory,
        foreignKey: 'movie_id',
    });

    Category.belongsToMany(Movie, {
        through: MovieCategory,
        foreignKey: 'category_id',
    });


/* Setting up Model Relation to allow a Transaction to have multiple tickets */
    /* Associating multiple Tickets to a single Transaction */
    Transaction.hasMany(Ticket, {
        foreignKey: 'transaction_id'
    });

    Ticket.belongsTo(Transaction, {
        foreignKey: 'transaction_id'
    });


/* Setting up Model Relation to link a Ticket to a Movie */
    /* Associating a single Movie to multiple Tickets*/
    Movie.hasMany(Ticket, {
        foreignKey: 'movie_id'
    });

    /* Associating Tickets to a single Movie */
    Ticket.belongsTo(Movie, {
        foreignKey: 'movie_id'
    });


/* Setting up Model Relation to link Persons to Movies */
    /* Director Association */
    Movie.belongsTo(Person, {
        as: 'Director',
        foreignKey: 'director_id',
    });

    /* Producer Association */
    Movie.belongsTo(Person, {
        as: 'Producer',
        foreignKey: 'producer_id',
    });

    /* Cast Association */
    Movie.belongsToMany(Person, {
        as: 'Cast',
        foreignKey: 'movie_id',
        through: CastMember,
    });

    /* Associating Person with Movies */
    Person.belongsToMany(Movie, {
        foreignKey: 'member_id',
        through: CastMember,
    });


/* Setting up Model Relation to link a User to a Promotion */
    /* Promotion Association (so we know who made the promotion)*/
    User.hasMany(Promotion, {
        foreignKey: 'user_id',
    });

    /* User Association (if we query promotions, we can see who made it) */
    Promotion.belongsTo(User, {
        foreignKey: 'user_id',
        as: "User"
    });


/* Setting up Model Relation to link a User to a Transaction */
    /* Transaction Association (so we know who made the Transaction)*/
    User.hasMany(Transaction, {
        foreignKey: 'user_id'
    });

    /* User Association (if we query transactions, we can see the associated user) */
    Transaction.belongsTo(User, {
        foreignKey: 'user_id',
        as: "Transaction"
    });

/* Setting up Model Relation for Users to have an admin object */
    User.hasOne(Admin, {
        foreignKey: 'admin_id',
        constraints: false
    });

    Admin.belongsTo(User, {
        foreignKey: 'user_id',
        constraints: false
    });


export { Admin, Category, CastMember, Movie, MovieCategory, Person, Promotion, Ticket, Transaction, User };