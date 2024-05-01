import Admin from './Admin.js';
import Person from './Person.js';
import Card from './Card.js';
import Movie from './Movie.js';
import User from './User.js';
import Category from './Category.js';
import CastMember from './CastMember.js';
import MovieCategory from './MovieCategory.js';
import Promotion from './Promotion.js';
import Theatre from './Theatre.js';
import Showing from './Showing.js';
import TicketType from './TicketType.js';
import Transaction from './Transaction.js';
import Seat from './Seat.js';
import Ticket from './Ticket.js';

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
        onDelete: 'CASCADE'
    });

    /* User Association (if we query promotions, we can see who made it) */
    Promotion.belongsTo(User, {
        foreignKey: 'user_id',
        as: "User",
    });


/* Setting up Model Relation to link a User to a Transaction */
    /* Transaction Association (so we know who made the Transaction)*/
    User.hasMany(Transaction, {
        foreignKey: 'user_id',
    });

    /* User Association (if we query transactions, we can see the associated user) */
    Transaction.belongsTo(User, {
        foreignKey: 'user_id',
        as: "Transaction",
        onDelete: 'NO ACTION'
    });

/* Setting up Model Relation for Users to have an admin object */
    User.hasOne(Admin, {
        foreignKey: 'admin_id',
        constraints: false,
        onDelete: 'CASCADE'
    });

    Admin.belongsTo(User, {
        foreignKey: 'user_id',
        constraints: false,
    });

/* Setting up Model Relation for Users to have a Credit Card */
    User.hasMany(Card, {
        foreignKey: 'user_id',
        constraints: false,
        onDelete: 'CASCADE'
    });

    Card.belongsTo(User, {
        foreignKey: 'user_id',
        constraints: false
    });

/* Setting up Model Relation for Tickets to have a Ticket Type */
    Ticket.belongsTo(TicketType, {
        foreignKey: 'type',
        constraints: false,
    });    

    TicketType.hasMany(Ticket, {
        foreignKey: 'type',
        constraints: false,
        onUpdate: "CASCADE"
    });

/* Setting up Model Relation for Showings to belong to a Theatre */
    Showing.belongsTo(Theatre, {
        foreignKey: 'theatre_id',
    });    

    Theatre.hasMany(Showing, {
        foreignKey: 'theatre_id',
    });

/* Setting up Model Relation for Showings to belong to a Movie */
    Showing.belongsTo(Movie, {
        foreignKey: 'movie_id',
    });    

    Movie.hasMany(Showing, {
        foreignKey: 'movie_id',
    });

/* Setting up Model Relation for Seats to belong to a Showing */
    Seat.belongsTo(Showing, {
        foreignKey: 'showing_id',
    });    

    Showing.hasMany(Seat, {
        foreignKey: 'showing_id',
    });

/* Setting up Model Relation for Seats to belong to a Ticket */
    Ticket.hasOne(Seat, {
        foreignKey: 'ticket_id',
        constraints: false,
        onDelete: 'SET NULL'
    });

    Seat.belongsTo(Ticket, {
        foreignKey: 'ticket_id',
        constraints: false,
    });

/* Setting up Model Relation for a Promotion to belong to a Transaction */
    Transaction.hasOne(Promotion, {
        foreignKey: 'promotion_id',
        constraints: false,
        onDelete: 'SET NULL'
    });

    Promotion.belongsTo(Transaction, {
        foreignKey: 'promotion_id',
        constraints: false,
    });

export { Admin, Card, CastMember, Category, Movie, MovieCategory, Person, Promotion, Seat, Showing, Theatre, Ticket, TicketType, Transaction, User };