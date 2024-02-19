import { User } from '../../models'
import { verifyToken } from '../../utils/auth'
import { Request, Response } from 'express';

export const getAuthedUser = async (req: Request, res: Response) => {
    if (!verifyToken(req)) {
        res.status(401).json({ message: "You are not signed in!" });
        return;
    } else {
        try {
            const user = await User.findOne({ where: { id: req.session.userId }});

            res.json(user);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
}

export const getUserByName = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username }});

        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}