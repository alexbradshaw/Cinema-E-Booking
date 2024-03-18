import { Op } from 'sequelize';
import { Admin, Movie, Promotion, Ticket, Transaction, User } from '../../models/index.js'
import { verifyToken } from '../../utils/auth.js'
import { Request, Response } from 'express';
import { sendUpdateEmail } from '../../utils/utils.js';

export const getAuthedUser = async (req: Request, res: Response) => {
    if (!verifyToken(req)) {
        res.status(401).json({ message: "You are not signed in!" });
        return;
    } else {
        try {
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

            res.json(user);
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