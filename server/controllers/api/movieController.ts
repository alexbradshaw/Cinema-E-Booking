import { Op } from 'sequelize';
import { Movie } from '../../models'
import { Request, Response } from 'express';

    export const findMovies = async (req: Request, res: Response) => {
      const movies = await Movie.findAll();

      if (!movies) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.json(movies)
    }

    export const search = async (req: Request, res: Response) => {
        const movies = await Movie.findAll({
            where: {
              title: req.params.title
            }
        });

        const similarTitles = await Movie.findAll({
            where: {
                title: {
                    [Op.substring]: req.params.title
                }
            }
        });

        const arr = [];
        for (let i = 0; i < movies.length; i++) {
          arr.push(movies[i].id);
        }

        for (let i = 0; i < similarTitles.length; i++) {
          if (!arr.includes(similarTitles[i].id)) {
            movies.push(similarTitles[i]);
          }
        }
  
        if (!movies) {
          return res.status(404).json({ message: "Movie not found" });
        }
    
        res.json(movies)
      }
  
    export const addMovie = async (req: Request, res: Response) => {
      try {
        const movie = await Movie.create(req.body); 
  
        res.json(movie);
      } 
      catch (e) {
        console.error(e);
        res.status(400).json(e);
      }
    }