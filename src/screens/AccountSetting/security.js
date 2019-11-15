import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  resetUserPassword
} from '../../redux/actions/authActions';
// import { thisExpression } from '@babel/types';

class Security extends Component {
  state = {
    id: '',
    password_old: '',
    password: '',
    password_confirmation: ''
  };

  componentDidMount() {
    const { profile: { id } } = this.props;

    this.setState({
      id
    });
  }

  handleResetPassword = (e) => {
    e.preventDefault();

    this.props.resetUserPassword(this.state);

    this.setState({
      password_old: '',
      password: '',
      password_confirmation: ''
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { password, password_confirmation, password_old } = this.state;

    return (
      <div class="card">
        <div class="card-body">
          <div class="tab-content sub-form">
            <div id="individual" class="sub tab-pane fade show active">
              <form onSubmit={this.handleResetPassword} class="form">  
                <div class="form-group row">
                  <div class="col-xs-12 col-sm-8">
                    <label for="current">Old Password <span class="sup">*</span></label>
                    <input type="password" name="password_old" id="current" value={password_old} onChange={this.handleChange} class="form-control" />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-xs-12 col-sm-8">
                    <label for="password">New Password <span class="sup">*</span></label>
                    <input type="password" name="password" id="password" value={password} onChange={this.handleChange} class="form-control" />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-xs-12 col-sm-8">
                    <label for="password_confirmation">Confirm Password <span class="sup">*</span></label>
                    <input type="password" name="password_confirmation" 
                    value={password_confirmation} onChange={this.handleChange}  id="password_confirmation" class="form-control" />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  profile: profile.profile
});

export default connect(
  mapStateToProps,
  {
    resetUserPassword
  }
)(Security);