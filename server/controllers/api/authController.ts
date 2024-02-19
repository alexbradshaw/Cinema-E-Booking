import { User } from '../../models'
import { generateToken, verifyToken } from '../../utils/auth'
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body); 

    req.session.save(() => {
      req.session.isAdmin = user.isAdmin;
      req.session.userId = user.id; 
      req.session.jwt = generateToken(user);

      res.json({ token: req.session.jwt });
    })
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({
        where: {
            [Op.or]:[
                { username: req.body.username }, 
                { email: req.body.email }
            ] 
        }
    })

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const passCorrect = await user.checkPassword(req.body.password); 

    if (!passCorrect) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }

    try {
      req.session.save(() => {
        req.session.isAdmin = user.isAdmin;
        req.session.userId = user.id; 
        req.session.jwt = generateToken(user);

        res.json({ isAdmin: req.session.isAdmin, token: req.session.jwt }); 
      })
    }
    catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
  }

export const logout = async (req: Request, res: Response) => {
  if (!verifyToken(req)) {
      res.status(401).json({ message: "You are not signed in!"})
      return;
  } else {
      try {
        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
          res.status(200).json({message: "Successfully logged out."});
        });
      } catch (e) {
        console.error(e);
        res.status(400).json(e);
      }
  }
}

export const authCheck = async (req: Request, res: Response) => {
  const verified = verifyToken(req);
  let status;

  if (verified) {
    status = 200;
  } else {
    status = 401;
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    });
  }
  
  res.status(status).json(verified);
}