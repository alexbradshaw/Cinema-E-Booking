import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { NextFunction, Request, Response } from 'express';

const secret = process.env.SECRET || "Secret";
const expiration = 1000 * 60 * 60 * 4;

export const generateToken = (user: User, expirationMultiplier: number) => {
    return jwt.sign({ data: user }, secret, { expiresIn: expiration * expirationMultiplier });
}

export const verifyToken = (req: Request) => {
    const token = req.session.jwt || '';
    const userProvidedToken = req.headers.authorization?.split(' ')[1];

    if (!req.session.active || userProvidedToken == '' || token != userProvidedToken) {
        throw new Error('Account is not active or token is invalid!');
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

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.admin = {
            status: req.session.isAdmin ? true : false
        }
        next();
    } catch (e) {
        res.append('terminated', 'true');
        res.status(401).json("Your account is not authorized to perform this action!");
    }
}


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(verifyToken(req)) {
            req.auth = {
                status: true
            }
            next();
        } else {
            req.session.destroy(() => { 
                throw new Error('Credentials invalid, terminating session.'); 
            });
        }
    } catch (e) {
        res.append('terminated', 'true');
        res.status(401).json("Your session is invalid or expired, please reauthenticate!");
    }
}