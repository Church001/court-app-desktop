import React, { Component } from 'react';

import { 
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import Subscribe from './subscribe';
import MySubscriptions from './my-subscriptions';

class Subscriptions extends Component {
  state = {
    currentPath: 'subscriptions'
  }

  handleLinkClicked(currentPath) {
    this.setState({
      currentPath
    });
  }

  render() {
    const { currentPath } = this.state;

    return (
      <Router>
        <div className="row">
          <div className="col-md-12 main-dash">
            <div class="card">
              <div class="card-body">
                <ul class="nav account-head">
                  <li>
                    <Link onClick={() => this.handleLinkClicked('subscriptions')} to={`${this.props.match.path}`}
                    className={currentPath === 'subscriptions' ? 'active' : ''}>
                      My Subscription(s)
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => this.handleLinkClicked('subscribe')} className={currentPath === 'subscribe' ? 'active' : ''} to={`${this.props.match.path}subscribe`}>
                      Subscribe
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Route
              path={`${this.props.match.path}`}
              exact={true}
              component={MySubscriptions}
            />
            <Route
              path={`${this.props.match.path}subscribe`}
              component={Subscribe}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default Subscriptions;