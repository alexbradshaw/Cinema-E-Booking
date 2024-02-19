import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request } from 'express';

const secret = process.env.SECRET || "Secret";
const expiration = 1000 * 60 * 60 * 4;

export const generateToken = (user: User) => {
    return jwt.sign({ data: user }, secret, { expiresIn: expiration  });
}

export const verifyToken = (req: Request) => {
    const token = req.session.jwt || '';
    const userProvidedToken = req.headers.authorization;

    if (token != userProvidedToken) {
        return false;
    }

    try {
        jwt.verify(token, secret, { maxAge: expiration });
    } catch (e) {
        return false;
    }

    return true;
    
}