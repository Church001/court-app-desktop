import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';

class ChosenPlan extends Component {
  state = {
    plan: {} 
  }

  componentDidMount() {
    const plan = this.props.plans.find(plan => plan.id == this.props.match.params.planId);

    this.setState({
      plan
    });
  }

  handleMakePayment = (event) => {
    event.preventDefault();

    const url = `http://45.76.189.218/api/process?user_id=${this.props.profile.id}&plan_id=${this.state.plan.id}`;

    if (window.confirm('You will be redirected to a new page. Do you wish to continue?')) {
      window.shell.openExternal(url);
    }
  }

  render() {
    const { plan } = this.state;
    const { profile } = this.props;

    return (
      <div class="card">
        <div class="card-body">
          <Link to="/dashboard/subscriptionssubscribe" className="btn secondary-btn">&larr; Go Back</Link>
          <br /><br />
          <div class="caption">
            <h3>[{ plan.category }] { plan.name } - ₦{ plan.amount }</h3>
          </div>

            <div class="tab-content sub-form">
                <div id="individual" class="sub tab-pane fade show active">
                    <form onSubmit={this.handleMakePayment} class="form">
                      <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" value={ profile.name } disabled />
                      </div>
                      <div class="form-group row">
                        <div class="col-xs-12 col-sm-6">
                          <label for="email">Email</label>
                          <input type="email" class="form-control" value={ profile.email } disabled />
                        </div>
                        <div class="col-xs-12 col-sm-6">
                          <label for="phone">Phone</label>
                          <input type="text" class="form-control" value={ profile.phone } disabled />
                        </div>
                        </div>
                        <div class="form-group row">
                          <div class="col-xs-12 col-sm-6">
                            <label for="plan">Plan</label>
                            <input type="text" class="form-control" value={`${plan.name} - ₦${plan.amount}`} disabled />
                          </div>
                          <div class="col-xs-12 col-sm-6">
                            <p>Payment method</p>
                            <div class="form-check-inline">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="payment_method" value="online" required />Online
                              </label>
                            </div>
                            <div class="form-check-inline">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="payment_method" value="manual" required />Manual
                              </label>
                            </div>
                          </div>
                        </div>
                        <input type="hidden" name="plan_id" value="{{ $selected_plan->id }}" />
                        <button type="submit" class="btn btn-primary">Process Payment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = ({ profile, subscriptions }) => ({
  plans: subscriptions.plans,
  profile: profile.profile
});

export default connect(
  mapStateToProps,
  {}
)(ChosenPlan);