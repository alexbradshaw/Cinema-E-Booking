import { Request, Response } from "express";
import { verifyToken } from "../../utils/auth.js";

export const adminCheck = async (req: Request, res: Response) => {
    const verified = verifyToken(req);
    let status;

    if (verified && req.session.isAdmin) {
      status = 200;
    } else {
      status = 401;
    }

    res.status(status).json({
        isAdmin: req.session.isAdmin,
        permissions: req.session.permissions
    });
}