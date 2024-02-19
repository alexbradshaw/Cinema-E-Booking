import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './views/HomePage';
import Register from './views/Register';
import RegisterConfirmation from './views/RegisterConfirmation';
import Login from './views/Login';
import EditProfile from './views/EditProfile';
import Booking from './views/Booking';
import OrderSummary from './views/OrderSummary';
import Checkout from './views/Checkout';
import OrderConfirmation from './views/OrderConfirmation';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/*
        <Route path="/register" component={Register} />
        <Route path="/registerConfirmation" component={RegisterConfirmation} />
        <Route path="/login" component={Login} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/booking" component={Booking} />
        <Route path="/orderSummary" component={OrderSummary} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderConfirmation" component={OrderConfirmation} />
        */}
      </Switch>
    </Router>
  );
};

export default App;
