import { Op } from 'sequelize';
import { Category, Movie, Person } from '../../models/index.js'
import { Request, Response } from 'express';

    export const findMovies = async (req: Request, res: Response) => {
      const movies = await Movie.findAll({
          attributes: {
            exclude: ['director_id', 'producer_id'],
          },
          include: [
              {
              model: Person, 
              as: 'Director',
              attributes: ['name', 'image_url']
            },
            {
              model: Person, 
              as: 'Producer',
              attributes: ['name', 'image_url']
            },
            {
              model: Person, 
              as: "Cast",
              attributes: ['name', 'played', 'image_url'],
              through: {
                attributes: []
              }
            },
            {
              model: Category, 
              as: "categories",
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
          ]
      });

      if (!movies) {
        return res.status(404).json({ message: "No movies were found" });
      }

      res.json(movies)
    }

    export const searchMovies = async (req: Request, res: Response) => {
        const settings = {
            attributes: {
              exclude: ['director_id', 'producer_id'],
            },
            include: [
                {
                model: Person, 
                as: 'Director',
                attributes: ['name', 'image_url']
              },
              {
                model: Person, 
                as: 'Producer',
                attributes: ['name', 'image_url']
              },
              {
                model: Person, 
                as: "Cast",
                attributes: ['name', 'played', 'image_url'],
                through: {
                  attributes: []
                }
              },
              {
                model: Category, 
                as: "categories",
                attributes: ['name'],
                through: {
                  attributes: []
                }
              }
            ],
        }
      
        const movies = await Movie.findAll({
          where: {
            title: req.params.title
          }, 
          ...settings
        });

        const similarTitles = await Movie.findAll({
            where: {
                title: {
                    [Op.substring]: req.params.title
                }
            },
            ...settings
        });

        const movieIDs: Number[] = [];

        for (let i = 0; i < movies.length; i++) {
          movieIDs.push(movies[i].id);
        }

        for (let i = 0; i < similarTitles.length; i++) {
          const id = similarTitles[i].id;

          if (!movieIDs.includes(id)) {
            movies.push(similarTitles[i])
            movieIDs.push(id);
          }
        }
  
        if (movieIDs.length == 0) {
          return res.status(404).json({ message: "No movie was found matching these terms" });
        }
    
        res.json(movies)
      }
  
    export const addMovie = async (req: Request, res: Response) => {
      try {
        if (!req.session.isAdmin) {
          return res.status(401).json({ message: "Your account does not have permission to add a new Movie!" });
        }
        
        const movie = await Movie.create(req.body); 
  
        res.json(movie);
      } 
      catch (e) {
        console.error(e);
        res.status(400).json(e);
      }
    }