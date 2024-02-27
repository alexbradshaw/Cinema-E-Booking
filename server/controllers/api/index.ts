import { getAuthedUser, getUserByNameOrID, getUsers } from "./accountController";
import { authCheck, login, logout, signup } from "./authController";
import { addCategory, findCategories, findCategoriesList, searchCategories } from './categoryController'
import { addMovie, findMovies, searchMovies } from "./movieController";
import { adminCheck } from './adminController';
import { addPromotion, findPromotions } from './promotionController';

export { addCategory, addPromotion, addMovie, adminCheck, authCheck, findCategories, findCategoriesList, findPromotions, findMovies, getAuthedUser, getUserByNameOrID, getUsers, login, logout, searchCategories, searchMovies, signup } 