import { verifyToken } from '../../utils/auth.js';
import account from './account.js';
import admin from './admin.js';
import categories from './category.js';
import movies from './movie.js';
import promotions from './promotion.js';

import { NextFunction, Request, Response, Router } from 'express';

const api = Router();

api.use('/account', account);
api.use('/admin', admin);
api.use('/categories', categories);
api.use('/movies', movies);
api.use('/promotions', promotions);

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(verifyToken(req)) {

        }
    } catch (e) {
        res.status(401).json("Your session either expired or doesn't exist, please reauthenticate!" );
    }
    next();
}


export const checkAuth = (parameter: string, controller: Function) => {
    if (parameter) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if(JSON.parse(parameter) && verifyToken(req)) {
                    return controller;
                } else {
                    req.session.destroy(() => { 
                        throw new Error('Credentials invalid, terminating session.'); 
                    });
                }
            } catch (e) {
                res.status(401).json("Your session either expired or doesn't exist, please reauthenticate!" );
            }
            next();
        }
    }
}

export const checkPermission = (parameter: string, controller: Function) => {
    if (parameter) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if(JSON.parse(parameter) && verifyToken(req)) {
                    return controller;
                } else {
                    req.session.destroy(() => { 
                        throw new Error('Credentials invalid, terminating session.'); 
                    });
                }
            } catch (e) {
                res.status(401).json("Your session either expired or doesn't exist, please reauthenticate!" );
            }
            next();
        }
    }
}

export default api;