import { Admin, User } from '../../models/index.js'
import { generateToken, verifyUtilToken, verifyToken } from '../../utils/auth.js'
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { sendConfirmEmail, sendResetEmail, sendUpdateEmail } from '../../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create({...req.body, token: generateToken(req.body, 12), token_identifier: uuidv4()}); 

    sendConfirmEmail(req.body.email, user);

    req.session.save(() => {
      req.session.active = false;
      req.session.isAdmin = user.admin_id ? true : false;
      req.session.userId = user.id; 
      req.session.email = user.email;
      req.session.username = user.username;
      req.session.jwt = generateToken(user, 1);

      req.session.permissions = undefined;

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
        },
        include: [
          {
            model: Admin,
            attributes: {
              exclude: ['admin_id', 'user_id']
            }
          }
        ]
    })

    if (!user) {
      return res.status(401).json('Invalid user');
    } else if (!user.active) {
      return res.status(401).json('Your account is not active, please contact support for further assistance.')
    }

    const passCorrect = await user.checkPassword(req.body.password); 

    if (!passCorrect) {
      return res.status(401).json('Incorrect password!');
    }

    let expiration = 1;

    if (req.body.remember) {
      expiration = 6 * 30;
    }

    console.log(user.dataValues);
    

    try {
      req.session.save(() => {
        req.session.active = true;
        req.session.isAdmin = user.admin_id ? true : false;
        req.session.userId = user.id; 
        req.session.email = user.email;
        req.session.username = user.username;
        req.session.jwt = generateToken(user, expiration);
        req.session.remember = req.body.remember;

        req.session.permissions = user.admin ? user.admin.dataValues : undefined;

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
      res.status(401).json("You are not signed in!")
      return;
  } else {
      try {
        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
          res.status(200).json("Successfully logged out.");
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

export const verifyAccount = async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { token_identifier: req.params.token }});
    
    if (!user) {
      return res.status(401).json({ message: "Confirmation token invalid!" });
    } else if (!verifyUtilToken(user.token, .125)) {
      return res.status(403).json({ message: "Confirmation token expired!" });
    }

    req.session.active = true;

    await User.update(
      { active: true, token_identifier: '' },
      { where: { token_identifier: req.params.token }}
    );

    res.status(200).json({ auth: req.session.jwt });
}

export const resetPassword = async (req: Request, res: Response) => {
  const user = await User.findOne({
      where: {
          [Op.or]:[
              { username: req.body.userOrEmail }, 
              { email: req.body.userOrEmail }
          ] 
      }
  });

  if (!user) {
    return res.status(200);
  }

  try {
    const token = uuidv4();
    await User.update({ token: generateToken(user, .125), token_identifier: token }, { where: { id: user.id } })
    sendResetEmail(user.email, token);
    res.status(200);
  }
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { token_identifier: req.params.token }});
  
  if (!user) {
    return res.status(401).json({ message: "Reset token invalid!" });
  } else if (!verifyUtilToken(user.token, .125)) {
    return res.status(401).json({ message: "Reset token expired!" });
  }  

  try {
    await User.update(
      { password: req.body.password },
      { 
        where: { id: user.id },
        individualHooks: true
      },
    );

    sendUpdateEmail(user.email, user.username, '\'s Password');

    res.status(200).json('Password reset!');
  }
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}