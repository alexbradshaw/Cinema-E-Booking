import { Op } from 'sequelize';
import { Admin, Card, Movie, Promotion, Ticket, Transaction, User } from '../../models/index.js'
import { verifyToken } from '../../utils/auth.js'
import { Request, Response } from 'express';
import { sendUpdateEmail } from '../../utils/utils.js';

export const getAuthedUser = async (req: Request, res: Response) => {
    if (!verifyToken(req)) {
        res.status(401).json({ message: "You are not signed in!" });
        return;
    } else {
        try {
            const card = await Card.findOne({ where: { user_id: req.session.userId }});

            const user = await User.findOne(
                { 
                    where: { id: req.session.userId },
                    attributes: { exclude: ['password'] },
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
                                    attributes: ['seat_number', 'type'],
                                    include: [
                                        {
                                            model: Movie,
                                            attributes: ['title']
                                        }
                                    ]
                                }
                            ],
                            attributes: ['id', 'date', 'total']
                        }
                    ]
                }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found!'});
            }

            res.json({ user, card });
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
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
                                attributes: ['seat_number', 'type'],
                                include: [
                                    {
                                        model: Movie,
                                        attributes: ['title']
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

export const getUsers = async (req: Request, res: Response) => {
    try {
        if (!req.session.isAdmin) {
            res.status(401).json({ message: "You do not have permission to view these!" });
            return;
        }
        const user = await User.findAll({  
            attributes: { 
                exclude: ['email', 'password', 'admin_id'] 
            },
            include: [{ model: Admin, }],   
            });

        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const addCard = async (req: Request, res: Response) => {
    try {
        if (!verifyToken(req)) {
            res.status(401).json({ message: "You are not authorized!" });
            return;
        }

        const newCard = await Card.create({ ...req.body, user_id: req.session.userId });

        const user = await User.update({
            card_id: newCard.card_id
            },
            {
                where: {
                    id: req.session.userId
                }
            });

        sendUpdateEmail(req.session.email, req.session.username, '\'s available payment method');

        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const updateCard = async (req: Request, res: Response) => {
    try {
        if (!verifyToken(req)) {
            res.status(401).json({ message: "You are not authorized!" });
            return;
        }

        await Card.update(req.body, { where: { card_id: req.params.cardId, user_id: req.session.userId }});

        sendUpdateEmail(req.session.email, req.session.username, '\'s available payment method');

        res.json({ message: "Card successfully updated."});
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const deleteCard = async (req: Request, res: Response) => {
    try {
        if (!verifyToken(req)) {
            res.status(401).json({ message: "You are not authorized!" });
            return;
        }

        await Card.destroy({ where: { card_id: req.params.cardId, user_id: req.session.userId }});

        sendUpdateEmail(req.session.email, req.session.username, '\'s available payment method');

        res.json({ message: "Card successfully deleted."});
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        if (!verifyToken(req)) {
            res.status(401).json({ message: "You are not authorized!" });
            return;
        }
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