import { getAuthedUser, getUserByName } from "./accountController";
import { authCheck, login, logout, signup } from "./authController";
import { addCategory, findCategories, findCategoriesList, searchCategories } from './categoryController'
import { addMovie, findMovies, searchMovies } from "./movieController";
import { adminCheck } from './adminController';

export { addCategory, addMovie, adminCheck, authCheck, findCategories, findCategoriesList, findMovies, getAuthedUser, getUserByName, login, logout, searchCategories, searchMovies, signup } 