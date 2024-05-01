import { Op } from 'sequelize';
import { Category, Movie, Person, Seat, Showing, Theatre } from '../../models/index.js'
import { Request, Response } from 'express';

    export const findMovies = async (req: Request, res: Response) => {
      const movies = await Movie.findAll({
          order:['starts_showing'],
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
              attributes: ['name', 'image_url'],
              through: {
                attributes: ['played']
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
        return res.status(404).json("No movies were found");
      }

      res.json(movies)
    }

    export const findMoviesSlim = async (req: Request, res: Response) => {
      const movies = await Movie.findAll({
          attributes: {
            exclude: ['director_id', 'producer_id'],
          }
      });

      if (!movies) {
        return res.status(404).json("No movies were found");
      }

      res.json(movies)
    }

    export const findShowtimesAndSeats = async (req: Request, res: Response) => {
      const shows = await Showing.findAll({
        include: [
          {
            model: Movie,
            attributes: ['title']
          },
          {
            model: Theatre,
            attributes: ['isLarge']
          },
          {
            model: Seat,
            attributes: ['row', 'number', 'ticket_id']
          }
        ]
      })

      if (!shows) {
        return res.status(404).json("No showings were found");
      }

      res.json(shows);
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
                attributes: ['name', 'image_url'],
                through: {
                  attributes: ['played']
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
          return res.status(404).json("No movie was found matching these terms");
        }
    
        res.json(movies)
      }
