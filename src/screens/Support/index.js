import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';
import { getUserSupportThreads } from '../../redux/actions/supportActions';
import { getUserProfile } from '../../redux/actions/profileAction';

import ListThreads from './list';
import CreateThread from './create';
import ViewThread from './single';

class Support extends Component {
  componentDidMount() {
    this.props.getUserProfile();
    this.props.getUserSupportThreads(this.props.profile.id);
  }

  render() {
    return (
      <Router>
        <Route
          path={`${this.props.match.path}`}
          exact={true}
          component={ListThreads}
        />
        <Route
          path={`${this.props.match.path}/create`}
          component={CreateThread}
        />
        <Route
          path={`${this.props.match.path}/view/:threadId`}
          component={ViewThread}
        />
      </Router>
    );
  }
}

const mapStateToProps = ({ support, profile }) => ({
  threads: support.threads,
  profile: profile.profile
});

export default connect(
  mapStateToProps,
  { getUserSupportThreads, getUserProfile }
)(Support);