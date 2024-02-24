import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
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

const routes = [
  { index: true, element: <Home /> },
  { path: 'register', element: <Register /> },
  { path: 'admin', element: <Admin /> },
  { path: 'admin/promotions', element: <Admin /> },
  { path: 'admin/movies', element: <Admin /> },
  // { path: 'registerConfirmation', element: <RegisterConfirmation /> },
  { path: 'login', element: <Login /> },
  { path: 'editProfile', element: <EditProfile /> },
  { path: 'booking', element: <Booking /> },
  { path: 'movie', element: <MoviePage /> },
  { path: 'orderSummary', element: <OrderSummary /> },
  { path: 'checkout', element: <Checkout /> },
  { path: 'orderConfirmation', element: <OrderConfirmation /> },
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