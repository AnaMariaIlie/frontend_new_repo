import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Edit from '../Edit';
import Create from '../Create';
import Show from '../Show';
import ShowIngredient from '../ShowIngredient';
import EditIngredient from '../EditIngredient';
import ShowInteraction from '../ShowInteraction';
import EditInteraction from '../EditInteraction';
import ShowListIngredients from '../ShowListIngredients';
import CreateIngredient from '../CreateIngredient';
import Appp from '../../Appp';


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path='/app' component={Appp} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/showIngredient/:id' component={ShowIngredient} />
        <Route path='/editIngredient/:id' component={EditIngredient} />
        <Route path='/createIngredient' component={CreateIngredient} />
        <Route path='/showInteraction/:id' component={ShowInteraction} />
        <Route path='/editInteraction/:id' component={EditInteraction} />
        <Route path='/showListIngredients' component={ShowListIngredients} />
    </div>

  </Router>
);

export default withAuthentication(App);
