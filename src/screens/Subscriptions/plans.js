import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { connect } from 'react-redux';

import {
  Link
} from 'react-router-dom';

import {
  getPlans
} from '../../redux/actions/subscriptionsActions';

class Plans extends Component {
  state = {
    selectedPlanCategory: 'individual'
  }

  componentDidMount() {
    this.props.getPlans();
  }

  handleOnOptionChange = (changeEvent) => {
    this.setState({
      selectedPlanCategory: changeEvent.target.value
    });
  }

  showPlan = (plan) => {
    return plan.category === this.state.selectedPlanCategory;
  }

  render() {
    const { selectedPlanCategory } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <div class="card">
          <div class="card-body">
            <ul class="nav account-inner nav-tabs list-inline">
              <li><a href="#">Subscription Plans</a></li>
              <li class="active" id="individual_li">
                <a id="individual_id">
                  <input type="radio" name="plan" checked={selectedPlanCategory === 'individual'} id="individual_radio" onChange={this.handleOnOptionChange} value="individual" id="individual" />
                  <label htmlFor="individual">Individual Plans</label>
                </a>
              </li>
              <li id="corporate_li">
                <a id="corporate_id">
                  <input type="radio" name="plan" id="corporate_radio" checked={selectedPlanCategory === 'corporate'} onChange={this.handleOnOptionChange} value="corporate" id="corporate" />
                  <label htmlFor="corporate">Corporate Plans</label>
                </a>
              </li>
            </ul>
          </div>
        </div>
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
        <div className="tab-content">
          <div className="row sub">
            {
              this.props.plans.filter(this.showPlan).map((plan, index) => (
                <div class="col-sm-12 col-md-4 col-lg-4 col-xs-12" key={index}>
                  <div class="card">
                    <div class="card-body">
                      <h3>{ plan.name }</h3>
                      <h2>₦{ plan.amount }</h2>
                      <p>{ plan.description }</p>
                      <div class="button">
                        <Link to={`${this.props.match.path}${plan.id}`} className="btn btn-primary">select plan</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ subscriptions, auth }) => ({
  plans: subscriptions.plans,
  loading: auth.loading
});

export default connect(
  mapStateToProps,
  {
    getPlans
  }
)(Plans);