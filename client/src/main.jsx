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
// import RegisterConfirmation from './views/RegisterConfirmation';
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
import Reset from './views/ResetPassword.jsx';

const authMiddleware = (isAdmin) => {
  if (!localStorage.getItem('auth')) {
    return redirect('/login');
  } else if (isAdmin && !localStorage.getItem('admin')) {
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
    { path: 'resetPassword', element: <Reset />},
    //{ path: 'registerConfirmation', element: <RegisterConfirmation /> },
    { path: 'booking', element: <Booking /> },

  /* Auth Protected Routes */
    { path: 'admin', element: <Admin />, loader: () => authMiddleware(true) },
    { path: 'admin/promotions', element: <ManagePromotions />, loader: () => authMiddleware(true) },
    { path: 'admin/movies', element: <ManageMovies />, loader: () => authMiddleware(true) },
    { path: 'admin/movies/addMovie', element: <AddMovie />, loader: () => authMiddleware(true) },
    { path: 'admin/users', element: <ManageUsers />, loader: () => authMiddleware(true) },
    { path: 'editProfile', element: <EditProfile />, loader: () => authMiddleware(false) },
    { path: 'checkout', element: <Checkout />, loader: () => authMiddleware(false) },
    { path: 'orderSummary', element: <OrderSummary />, loader: () => authMiddleware(false) },
    { path: 'orderConfirmation', element: <OrderConfirmation />, loader: () => authMiddleware(false) },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <>Error</>,
    children: routes
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)