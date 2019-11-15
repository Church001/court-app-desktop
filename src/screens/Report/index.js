import React, { Component } from 'react';

import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllReports } from '../../redux/actions/reportsActions';
import { getUserProfile } from '../../redux/actions/profileAction';

import AllReports from './allReports';
import FavoriteReports from './favoriteReports';
import ReadLaterReports from './readLaterReports';
// import OfflineReport from './offlineReport';
import FullReport from './fullReport';
import Ratios from './ratios';
import CitedAuthorities from './citedAuthorities';
import ReadOffline from './readOffline';
class Report extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    // console.log('location', this.props.match.path + 'readOffline');
    // console.log('location1111', this.props.match.path + 'readlater');

    return (
      <Router>
        
        <Route
          path={`${this.props.match.path}`}
          exact={true}
          component={AllReports}
        />
        <Route
          path={`${this.props.match.path}favorites`}
          component={FavoriteReports}
        />
        <Route
          path={`${this.props.match.path}readlater`}
          component={ReadLaterReports}
        />
        <Route
          path={`${this.props.match.path}fullreport`}
          component={FullReport}
        />
        {/* <Route
          path={`${this.props.match.path}offlinereport`}
          component={OfflineReport}
        /> */}
        <Route
          path={`${this.props.match.path}ratios`}
          component={Ratios}
        />
        <Route
          path={`${this.props.match.path}citedauthorities`}
          component={CitedAuthorities}
        />
        <Route
          path={`${this.props.match.path}readoffline`}
          component={ReadOffline}
        />
      </Router>
    );
  }
}

const mapStateToProps = ({ reports }) => ({
  allReports: reports.allReports
});

export default connect(
  mapStateToProps,
  { getAllReports, getUserProfile }
)(Report);