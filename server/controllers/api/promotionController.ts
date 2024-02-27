import { Promotion, User } from '../../models'
import { Request, Response } from 'express';

    export const findPromotions = async (req: Request, res: Response) => {
      const promotions = await Promotion.findAll({
          attributes: {
            exclude: ['user_id'],
          },
          include: [
              {
              model: User, 
              as: 'User',
              attributes: ['username', 'profile_pic']
            },
          ]
      });

      if (!promotions) {
        return res.status(404).json({ message: "No promotions were found" });
      }

      res.json(promotions)
    }
  
    export const addPromotion = async (req: Request, res: Response) => {
      try {
        if (!req.session.permissions?.promotions) {
          return res.status(401).json({ message: "Your account does not have permission to add a new promotion!" });
        }
        
        const promotion = await Promotion.create({
          ...req.body,
          "user_id": req.session.userId
        }); 
  
        res.json(promotion);
      } 
      catch (e) {
        console.error(e);
        res.status(400).json(e);
      }
    }