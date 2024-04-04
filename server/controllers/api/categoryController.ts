import { Op } from 'sequelize';
import { Category, Movie, Person } from '../../models/index.js'
import { Request, Response } from 'express';

export const findCategories = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    attributes: {
        exclude: ['id']
    },
    include: [
        {
            model: Movie,
            attributes:{
              exclude: ['director_id', 'producer_id']
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
            ],
            through: {
                attributes: []
            }
        }
    ]
  });

  if (!categories) {
    return res.status(404).json("No categories found");
  }

  res.json(categories)
}

export const findCategoriesList = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    attributes: {
        include: ['id', 'name']
    },
  });

  if (!categories) {
      return res.status(404).json("No categories found");
  }

  res.json(categories)
}

export const searchCategories = async (req: Request, res: Response) => {
  const category = await Category.findOne({
    where: {
        name: req.params.category
    },
    include: [
      {
          model: Movie,
          attributes:{
            exclude: ['director_id', 'producer_id']
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
          ],
          through: {
              attributes: []
          }
      }
    ]
  });

  const similarCategories = await Category.findAll({
    where: {
        name: {
          [Op.substring]: req.params.category
        }
    },
      include: [
        {
            model: Movie,
            attributes: {
              exclude: ['director_id', 'producer_id', 'name']
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
            ],
            through: {
                attributes: []
            }
        }
    ]
  });

  const arr: Movie[] = category?.movies? category.movies : [];
  const movieIDs: Number[] = [];

  for (let i = 0; i < arr.length; i++) {
    movieIDs.push(arr[i].id);
  }

  for (let i = 0; i < similarCategories.length; i++) {
    for (let j = 0; j < similarCategories[i].movies.length; j++) {
      const id = similarCategories[i].movies[j].id;

      if (!movieIDs.includes(id)) {
        arr.push(similarCategories[i].movies[j]);
        movieIDs.push(id);
      }
    }
  }

  if (movieIDs.length == 0) {
    return res.status(404).json("Category not found");
  }

  res.json(arr)
}