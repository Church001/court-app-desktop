import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import PersonalDetails from './personal-details';
import ContactInformation from './contact-information';
import Security from './security';

class AccountSetting extends Component {
  state = {
    currentPath: 'personal'
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
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 main-dash">
            <div className="card">
              <div className="card-body">
                <ul className="nav account-head">
                  <li>
                    <Link onClick={() => this.handleLinkClicked('personal')} className="" to={`${this.props.match.path}`} className={currentPath === 'personal' ? 'active' : ''}>
                      Personal Details
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => this.handleLinkClicked('contact')} className="" to={`${this.props.match.path}contact-information`} className={currentPath === 'contact' ? 'active' : ''}>
                      Contact Information
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => this.handleLinkClicked('security')} className="" to={`${this.props.match.path}security`}className={currentPath === 'security' ? 'active' : ''}>
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Route
              path={`${this.props.match.path}`}
              exact={true}
              component={PersonalDetails}
            />

            <Route
              path={`${this.props.match.path}contact-information`}
              component={ContactInformation}
            />

            <Route
              path={`${this.props.match.path}security`}
              component={Security}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default AccountSetting;
