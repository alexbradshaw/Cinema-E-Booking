import { Promotion, User } from '../../models/index.js'
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
        return res.status(404).json("No promotions were found");
      }

      res.json(promotions)
    }
  
