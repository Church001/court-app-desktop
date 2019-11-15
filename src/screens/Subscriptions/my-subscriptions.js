import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import moment from 'moment';
import { connect } from 'react-redux';
import {getUserSubscriptions} from '../../redux/actions/subscriptionsActions';
import {getUserProfile} from '../../redux/actions/profileAction';

class MySubscriptions extends Component {
  componentDidMount() {
    this.props.getUserProfile();
    this.props.getUserSubscriptions();
  }

  render() {
    const { subscriptions, loading } = this.props;
          
    return (
      <div class="card">
        {
          loading && (
            <div className="absolute-loader">
              <Loader
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          )
        }
        <div class="card-body table-responsive">
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Plan</th>
                <th scope="col">Amount</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Plan Status</th>
                <th scope="col">Expiry</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {
                subscriptions.map((subscription, index) => (
                  <tr>
                    <td scope="row">{ ++index }</td>
                    <td>{ this.props.profile.name }</td>
                    <td>{ subscription.plan.name }</td>
                    <td>{ subscription.plan.amount }</td>
                    <td style={{ textTransform: 'capitalize' }}>{ subscription.payment === null ? 'free trial' : subscription.payment.gateway}</td>
                    <td style={{ textTransform: 'capitalize' }} className={subscription.status === 'active' ? 'active' : 'expiry'}>{ subscription.status }</td>
                    <td>{ moment(subscription.expires_at).format('d-m-Y') }</td>
                    <td>{ moment(subscription.created_at).format('d-m-Y') }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ subscriptions, profile, auth }) => ({
  subscriptions: subscriptions.subscriptions,
  profile: profile.profile,
  loading: auth.loading
})

export default connect(
  mapStateToProps,
  {
    getUserSubscriptions,
    getUserProfile
  }
)(MySubscriptions);