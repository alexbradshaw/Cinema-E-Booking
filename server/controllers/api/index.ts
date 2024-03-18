import { getAuthedUser, getUserByNameOrID, getUsers, updateUser } from "./accountController";
import { authCheck, changePassword, login, logout, resetPassword, signup, verifyAccount } from "./authController";
import { addCategory, findCategories, findCategoriesList, searchCategories } from './categoryController'
import { addMovie, findMovies, searchMovies } from "./movieController";
import { adminCheck } from './adminController';
import { addPromotion, findPromotions } from './promotionController';

export { addCategory, addPromotion, addMovie, adminCheck, authCheck, changePassword, findCategories, findCategoriesList, findPromotions, findMovies, getAuthedUser, getUserByNameOrID, getUsers, login, logout, resetPassword, searchCategories, searchMovies, signup, updateUser, verifyAccount } 