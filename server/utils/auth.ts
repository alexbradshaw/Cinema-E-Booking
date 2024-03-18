import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { Request } from 'express';

const secret = process.env.SECRET || "Secret";
const expiration = 1000 * 60 * 60 * 4;

export const generateToken = (user: User, expirationMultiplier: number) => {
    return jwt.sign({ data: user }, secret, { expiresIn: expiration * expirationMultiplier });
}

export const verifyToken = (req: Request) => {
    const token = req.session.jwt || '';
    const userProvidedToken = req.headers.authorization?.split(' ')[1];

    if (!req.session.active || userProvidedToken == '' || token != userProvidedToken) {
        return false;
    }

    try {
        jwt.verify(token, secret, { maxAge: expiration * (req.session.remember ? 6 * 30 : 1) });
    } catch (e) {
        return false;
    }

    return true;
}

export const verifyUtilToken = (token: string, expirationMultiplier: number) => {
    try {
        jwt.verify(token, secret, { maxAge: expiration * expirationMultiplier });
        return true;
    } catch (e) {
        return false;
    }
}