import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './views/HomePage';
import AfterLogin from './views/AfterLogin.jsx';
// import Register from './views/Register';
// import RegisterConfirmation from './views/RegisterConfirmation';
// import Login from './views/Login';
// import EditProfile from './views/EditProfile';
 import Booking from './views/Booking';
// import OrderSummary from './views/OrderSummary';
// import Checkout from './views/Checkout';
// import OrderConfirmation from './views/OrderConfirmation';

const routes = [
  { index: true, element: <Home /> },
  // { path: 'register', element: <Register /> },
  // { path: 'registerConfirmation', element: <RegisterConfirmation /> },
  // { path: 'login', element: <Login /> },
  // { path: 'editProfile', element: <EditProfile /> },
   { path: 'booking', element: <Booking /> },
   { path: 'loggedin', element: <AfterLogin /> },
  // { path: 'orderSummary', element: <OrderSummary /> },
  // { path: 'checkout', element: <Checkout /> },
  // { path: 'orderConfirmation', element: <OrderConfirmation /> },
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
