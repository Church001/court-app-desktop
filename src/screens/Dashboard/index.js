import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../redux/actions/authActions";
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom';
import { isPropertyAccessExpression } from 'typescript';
import '../styles.css';
import ReportIndex from '../Report/index';
import SubscriptionsIndex from '../Subscriptions/index';
import SupportIndex from '../Support/index';
import AccountSetting from '../AccountSetting/index';
import OfflineReport from '../Report/offlineReport';
import ReadOffline from '../Report/readOffline';

const routes = [
  {
    path: '/',
    name: 'Report',
    exact: true,
    iconSrc: '/assets/images/icons/report.svg',
    main: ReportIndex
  },
  {
    path: '/subscriptions',
    name: 'Manage Subscriptions',
    iconSrc: '/assets/images/icons/subscription.svg',
    main: SubscriptionsIndex
  },
  {
    path: '/support',
    name: 'Support Desk',
    iconSrc: '/assets/images/icons/support.svg',
    main: SupportIndex
  },
  {
    path: '/personal',
    name: 'Account/Settings',
    iconSrc: '/assets/images/icons/account-setting.svg',
    main: AccountSetting
  },
  {
    path: '/offlinereport',
    name: 'Offline Report',
    iconSrc: '/assets/images/icons/account-setting.svg',
    main: OfflineReport
  },
];

const routess = [
  {
    path: '/',
    name: 'Report',
    exact: true,
    iconSrc: '/assets/images/icons/report.svg',
    main: ReportIndex
  },
  {
    path: '/subscriptions',
    name: 'Manage Subscriptions',
    iconSrc: '/assets/images/icons/subscription.svg',
    main: SubscriptionsIndex
  },
  {
    path: '/support',
    name: 'Support Desk',
    iconSrc: '/assets/images/icons/support.svg',
    main: SupportIndex
  },
  {
    path: '/personal',
    name: 'Account/Settings',
    iconSrc: '/assets/images/icons/account-setting.svg',
    main: AccountSetting
  },
  {
    path: '/offlinereport',
    name: 'Offline Report',
    iconSrc: '/assets/images/icons/account-setting.svg',
    main: OfflineReport
  },{
    path: '/readoffline',
    name: 'Offline Report',
    iconSrc: '/assets/images/icons/account-setting.svg',
    main: ReadOffline
  },
];
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarActive: false,
      currentRoute: '/'
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  routeChanged(newRoute) {
    this.setState({ currentRoute: newRoute });
  }

  handleUserLogout() {
    const { logoutUser, history } = this.props;

    if (window.confirm('Are you sure you want to logout?')) {
      logoutUser(history);
    }
  }

  handleSideBarActive = () => {
    this.setState({ 
      sidebarActive: !this.state.sidebarActive 
    });
  }

  render() {
    const { profile } = this.props;
    return (
      <Router>
        <div className="wrapper">
           <nav className="topnav">
            <div className="sidebar-header">
              <img src="/assets/images/logo/logo.svg" alt="" />
            </div>

            <button type="button" id="sidebarCollapse" class="btn btn-info" style={{backgroundColor: 'white', border: '1px solid white'}} onClick={() => this.handleSideBarActive()}>
              <i class="fas fa-align-justify fa-2x" style={{color: '#2D002B', fontSize: '35px'}}></i>
            </button>
            
          </nav>

          <nav id="sidebar" className={this.state.sidebarActive ? 'active' : ''}>
            <div className="sidenav-title">
              <h4>{ profile.name }</h4>
              <p className="emailText">{ profile.email }</p>
            </div>

            <ul class="list-unstyled components">
              {routes.map((route, index) => (
                <li className={`nav-item ${ this.state.currentRoute === route.path ? 'active' : '' }`} key={index}>
                  <Link
                    to={`${this.props.match.path}${route.path}`}
                    className="nav-link"
                    onClick={() => this.routeChanged(route.path)}
                  >
                    <img src={ route.iconSrc } alt="" />
                    <span>{ route.name }</span>
                  </Link>
                </li>
              ))}

              <div className="nav-item-header">
                Quick Links
              </div>

              <li className="nav-item" onClick={() => window.shell.openExternal('https://courtofappealreportsnigeria.com/faq')}>
                <a href="#" className="nav-link">
                  <img src="/assets/images/icons/faq.svg" alt="" />
                  <span>FAQs</span>
                </a>
              </li>

              <li className="nav-item" onClick={() => window.shell.openExternal('https://courtofappealreportsnigeria.com/terms-and-conditions')}>
                <a href="#" className="nav-link">
                  <img src="/assets/images/icons/terms-and-condition.svg" alt="" />
                  <span>Terms and Conditions</span>
                </a>
              </li>
              
              <li className="nav-item" onClick={() => this.handleUserLogout()}>
                <a href="#" className="nav-link">
                  <img src="/assets/images/icons/logout-icon.svg" alt="" />
                  <span>Logout</span>
                </a>
              </li>
             
            </ul>
          </nav>

          <div className={`content-wrapper ${this.state.sidebarActive ? 'wide' : ''}`}>
            <div className="content" id="content">
              {routess.map((route, index) => (
                <Route
                  key={index}
                  path={`${this.props.match.path}${route.path}`}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  profile: profile.profile
});

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(Dashboard);
