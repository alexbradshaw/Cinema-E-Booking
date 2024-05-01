import { Op } from 'sequelize';
import { Card, Movie, Promotion, Seat, Showing, Theatre, Ticket, TicketType, Transaction, User } from '../../models/index.js'
import { Request, Response } from 'express';
import { sendUpdateEmail } from '../../utils/utils.js';

export const addCard = async (req: Request, res: Response) => {
    try {
        const newCard = await Card.create({ ...req.body, user_id: req.session.userId });

        await User.update({
            card_id: newCard.card_id
            },
            {
                where: {
                    id: req.session.userId
                }
            });

        sendUpdateEmail(req.session.email, req.session.username, '\'s available payment method');

        res.json(newCard);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const deleteCard = async (req: Request, res: Response) => {
    try {
        await Card.destroy({ where: { card_id: req.params.cardId, user_id: req.session.userId }});

        sendUpdateEmail(req.session.email, req.session.username, '\'s available payment method');

        res.json("Card successfully deleted.");
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const getAuthedCard = async (req: Request, res: Response) => {
    try {
        const card = await Card.findOne({ where: { user_id: req.session.userId }});

        if (!card) {
            return res.status(404).json('No card found!');
        }

        res.json(card);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const getAuthedUser = async (req: Request, res: Response) => {
    try {
        const card = await Card.findOne({ where: { user_id: req.session.userId }});

        const user = await User.findOne(
            { 
                where: { id: req.session.userId },
                attributes: { exclude: ['id', 'password', 'token', 'token_identifier', 'admin_id'] },
                include: [
                    {
                        model: Transaction,
                        include: [
                            {
                                model: Promotion,
                                attributes: ['id', 'title', 'discount_value']
                            },
                            {
                                model: Ticket,
                                attributes: { exclude: ['id', 'type', 'movie_id', 'transaction_id']},
                                order: ['ticket_seat_id', 'ASC'],
                                include: [
                                    {
                                        model: Seat,
                                        attributes: ['row', 'number'],
                                        include: [
                                            {
                                                model: Showing,
                                                attributes: ['time'],
                                                include: [
                                                    {
                                                        model: Theatre,
                                                        attributes: ['id']
                                                    },
                                                    {
                                                        model: Movie,
                                                        attributes: ['title', 'length']
                                                    },
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        model: TicketType,
                                        attributes: ['name', 'price']
                                    }
                                ]
                            },
                        ],
                        attributes: ['id', 'date', 'total', 'promotion_id']
                    }
                ],
                order: [[Transaction, 'date', 'DESC']],
            }
        );

        if (!user) {
            return res.status(404).json('No user found!');
        } else if (!user?.active) {
            return req.session.destroy(() => {
                res.append('terminated', 'true');
                res.status(401).json('Account is not active, please contact support.')
              }
            );
        }

        res.json({ user, card });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const getUserByNameOrID = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne(
            { 
                where: { 
                    [Op.or]: {
                        username: req.params.usernameOrID,
                        id: req.params.usernameOrID
                    }
                 },
                attributes: { exclude: ['email', 'password'] },
                include: [
                    {
                        model: Promotion,
                        attributes: ['id', 'title', 'discount_value']
                    },
                    {
                        model: Transaction,
                        include: [
                            {
                                order: ['id', 'ASC'],
                                model: Ticket,
                                attributes: ['seat_number'],
                                include: [
                                    {
                                        model: Movie,
                                        attributes: ['title']
                                    },
                                    {
                                        model: TicketType,
                                        attributes: ['name', 'price']
                                    }
                                ]
                            }
                        ],
                        attributes: ['id', 'date', 'total']
                    }
                ]
            }
        );

        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const updateCard = async (req: Request, res: Response) => {
    try {
        await Card.update(req.body, { where: { card_id: req.params.cardId, user_id: req.session.userId }});

        sendUpdateEmail(req.session.email, req.session.username, '\'s available payment method');

        res.json("Card successfully updated.");
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.update({
            ...req.body
            },
            {
                where: {
                    id: req.session.userId
                }
            });

        sendUpdateEmail(req.session.email, req.session.username, '');

        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}