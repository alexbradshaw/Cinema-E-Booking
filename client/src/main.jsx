import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Home from './views/HomePage';
import Register from './views/Register';
import Login from './views/Login';
import EditProfile from './views/EditProfile';
import Booking from './views/Booking';
import MoviePage from './views/MoviesPage.jsx';
import OrderSummary from './views/OrderSummary';
import Checkout from './views/Checkout';
import OrderConfirmation from './views/OrderConfirmation';
import Admin from './views/Admin.jsx';
import ManagePromotions from './views/ManagePromotions.jsx';
import ManageMovies from './views/ManageMovies.jsx'
import AddMovie from './views/AddMovie.jsx';
import ManageUsers from './views/ManageUsers';
import ManageUser from './views/ManageUser';
import Reset from './views/ResetPassword.jsx';
import RegisterConfirmation from './views/RegisterConfirmation.jsx';
import ChangePassword from './views/ChangePassword.jsx';
import ManageMovie from './views/ManageMovie.jsx';
import ManageTickets from './views/ManageTickets.jsx';

const authMiddleware = (isAdmin, permission, requireAuth = true) => {
  let permissions = {};
  if (localStorage.getItem('permissions') !== undefined) {
    permissions = JSON.parse(localStorage.getItem('permissions'));
  }

  // Check for auth only if requireAuth is true
  if (requireAuth && !localStorage.getItem('auth')) {
    return redirect('/login');
  } else if (isAdmin && !localStorage.getItem('admin')) {
    return redirect('/');
  } else if (permission && !permissions[permission]) {
    return redirect('/');
  } else {
    return null;
  }
}

const routes = [
  /* Public Routes */
    { index: true, element: <Home /> },
    { path: 'movie', element: <MoviePage /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'verify/:token', element: <RegisterConfirmation /> },
    { path: 'resetPassword', element: <Reset />},
    { path: 'reset/:token', element: <ChangePassword />},
    { path: 'booking', element: <Booking />, loader: () => authMiddleware(false, null, false) },

  /* Auth Protected Routes */
    { path: 'admin', element: <Admin />, loader: () => authMiddleware(true) },
    { path: 'admin/promotions', element: <ManagePromotions />, loader: () => authMiddleware(true, 'manage_promotions') },
    { path: 'admin/tickets', element: <ManageTickets />, loader: () => authMiddleware(true, 'manage_movies') },
    { path: 'admin/movies', element: <ManageMovies />, loader: () => authMiddleware(true, 'manage_movies') },
    { path: 'admin/movies/:id', element: <ManageMovie />, loader: () => authMiddleware(true, 'manage_movies') },
    { path: 'admin/movies/addMovie', element: <AddMovie />, loader: () => authMiddleware(true, 'manage_movies') },
    { path: 'admin/users', element: <ManageUsers />, loader: () => authMiddleware(true, 'manage_accounts') },
    { path: 'admin/users/:id', element: <ManageUser />, loader: () => authMiddleware(true, 'manage_accounts') },
    { path: 'booking', element: <Booking />, loader: () => authMiddleware(false) },
    { path: 'editProfile', element: <EditProfile />, loader: () => authMiddleware(false) },
    { path: 'checkout', element: <Checkout />, loader: () => authMiddleware(false, null, false) }, // No auth required until certain action
    { path: 'orderSummary', element: <OrderSummary />, loader: () => authMiddleware(false, null, false) }, 
    { path: 'orderConfirmation', element: <OrderConfirmation />, loader: () => authMiddleware(false, null, false) }, 
  
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)