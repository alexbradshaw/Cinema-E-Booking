import { Request, Response } from "express";
import { Admin, Category, Movie, Promotion, TicketType, User } from "../../models/index.js";

export const addAdmin = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_admins) {
        res.status(403).json("Your account is not authorized to add an admin!" );
        return;
    }

    const newAdmin = await Admin.create(req.body);

    const updated = await User.update(
      {
        admin_id: newAdmin.admin_id
      },
      {
        where: { 
          id: req.body.user_id 
        }
      }
    );

    res.status(201).json(updated);
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

export const addCategory = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_categories) {
      return res.status(403).json("Your account is not authorized to add a category!" );
    }

    const category = await Category.create(req.body); 

    res.status(201).json(category);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const addMovie = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_movies) {
      return res.status(403).json("Your account is not authorized to add a movie!" );
    }
    
    const movie = await Movie.create(req.body); 

    res.status(201).json(movie);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const addPromotion = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_promotions) {
      return res.status(403).json("Your account is not authorized to add a promotion!" );
    }
    
    const newTitle = `$${req.body.discount_value} Off Purchase of $${req.body.condition}`

    const newPromotion = await Promotion.create({
      ...req.body,
      "user_id": req.session.userId,
      "title":  newTitle
    }); 

    res.status(201).json(newPromotion);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const addTicketType = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_movies) {
      return res.status(403).json("Your account is not authorized to add a ticket type!" );
    }
    
    const newTicket = await TicketType.create(req.body); 

    res.status(201).json(newTicket);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const adminCheck = async (req: Request, res: Response) => {
  let status;

  const admin = await Admin.findOne({ 
    where: {
      user_id: req.session.userId
    }
  })

  if (admin) {
    status = 200;
  } else {
    status = 401;
  }

  res.status(status).json({
      isAdmin: admin ? true: false,
      permissions: admin
  });
}

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_promotions) {
      return res.status(403).json("Your account is not authorized to delete a promotion!" );
    }
    
    const deleted = await Promotion.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    ); 

    res.json(deleted);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const editAccountStanding = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_accounts) {
        res.status(403).json("Your account is not authorized to modify account standings!" );
        return;
    }

    const updated = await User.update(
      {
        active: req.body.active
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.json(updated);
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

export const editAdminPermissions = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_admins) {
        res.status(403).json("Your account is not authorized to manage other admins!" );
        return;
    }

    const updated = await Admin.update(
      req.body,
      {
        where: {
          user_id: req.params.id
        }
      }
    );

    res.json(updated);
  }
  catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}

export const editPromotion = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_promotions) {
      return res.status(403).json("Your account is not authorized to edit a promotion!");
    }
    
    const newTitle = `$${req.body.discount_value} Off Purchase of $${req.body.condition}`

    const updated = await Promotion.update(
      { ...req.body, title: newTitle },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.json(updated);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const editTicket = async (req: Request, res: Response) => {
  try {
    if (!req.session.permissions?.manage_movies) {
      return res.status(403).json("Your account is not authorized to edit tickets!");
    }
    
    const updated = await TicketType.update(
      { ...req.body },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.json(updated);
  } 
  catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
}

export const getAdminFields = async (req: Request, res: Response) => {
  try {
      if (!req.session.permissions?.manage_admins) {
          res.status(403).json("Your account is not authorized to manage admins!");
          return;
      }

      const fields = [];

      for (let field in Admin.getAttributes()) {
        fields.push(field);
      }

      res.json(fields);
  } catch (e) {
      console.log(e);
      res.status(500).json(e);
  }
}

export const getTicketTypes = async (req: Request, res: Response) => {
  try {
      if (!req.session.permissions?.manage_movies) {
          res.status(403).json("Your account is not authorized to manage tickets!");
          return;
      }

      const tickets = await TicketType.findAll({});

      res.json(tickets);
  } catch (e) {
      console.log(e);
      res.status(500).json(e);
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
      if (!req.session.permissions?.manage_accounts) {
          res.status(403).json("Your account is not authorized to view all users!");
          return;
      }
      const user = await User.findAll({  
          attributes: { 
              exclude: ['email', 'password', 'admin_id'] 
          },
          include: [{ model: Admin, attributes: {
            exclude: ['admin_id', 'user_id']
          } }],   
          });

      res.json({ users: user, currentUserId: req.session.userId });
  } catch (e) {
      console.log(e);
      res.status(500).json(e);
  }
}
