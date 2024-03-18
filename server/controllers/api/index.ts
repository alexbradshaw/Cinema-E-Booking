import { getAuthedUser, getUserByNameOrID, getUsers, updateUser } from "./accountController.js";
import { authCheck, changePassword, login, logout, resetPassword, signup, verifyAccount } from "./authController.js";
import { addCategory, findCategories, findCategoriesList, searchCategories } from './categoryController.js'
import { addMovie, findMovies, searchMovies } from "./movieController.js";
import { adminCheck } from './adminController.js';
import { addPromotion, findPromotions } from './promotionController.js';

export { addCategory, addPromotion, addMovie, adminCheck, authCheck, changePassword, findCategories, findCategoriesList, findPromotions, findMovies, getAuthedUser, getUserByNameOrID, getUsers, login, logout, resetPassword, searchCategories, searchMovies, signup, updateUser, verifyAccount } 