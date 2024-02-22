import { getAuthedUser, getUserByName } from "./accountController";
import { authCheck, login, logout, signup } from "./authController";
import { addCategory, findCategories, findCategoriesList, searchCategories } from './categoryController'
import { addMovie, findMovies, searchMovies } from "./movieController";

export { addCategory, addMovie, authCheck, findCategories, findCategoriesList, findMovies, getAuthedUser, getUserByName, login, logout, searchCategories, searchMovies, signup } 