import React, { Component } from 'react';

import { 
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Plans from './plans';
import ChosenPlan from './chosen-plan';

class Subscribe extends Component {
  render() {
    return (
      <Router>
        <Route
          path={`${this.props.match.path}`}
          exact={true}
          component={Plans}
        />
        <Route
          path={`${this.props.match.path}:planId`}
          component={ChosenPlan}
        />
      </Router>
    );
  }
}

export default Subscribe;