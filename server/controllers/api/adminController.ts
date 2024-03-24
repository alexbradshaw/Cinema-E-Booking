import { Request, Response } from "express";
import { verifyToken } from "../../utils/auth.js";
import { Admin, User } from "../../models/index.js";

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

export const changeAdminPermissions = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_admins || !verifyToken(req)) {
        res.status(401).json({ message: "You are not authorized to perform this action!" });
        return;
    }

    await Admin.update(
      { ...req.body },
      {
        where: {
          admin_id: req.params.admin_id
        }
      }
    );
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

export const changeAccountStanding = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.disable_accounts || !verifyToken(req)) {
        res.status(401).json({ message: "You are not authorized to perform this action!" });
        return;
    }

    await User.update(
      {
        active: req.body.active
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.delete_accounts || !verifyToken(req)) {
        res.status(401).json({ message: "You are not authorized to perform this action!" });
        return;
    }

    await User.update(
      {
        active: req.body.active
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}