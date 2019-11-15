import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  getUserProfile,
  updateUser
} from '../../redux/actions/profileAction';

class PersonalDetails extends Component {
  state = {
    id: '',
    name: '', 
    email: '', 
    phone: '', 
    username: '', 
    gender: ''
  }

  componentWillMount() {
    this.props.getUserProfile();
  }

  componentDidMount() {
    const { profile } = this.props;
    const { id, name, email, phone, username, gender } = profile;

    this.setState({
      id, name, email, phone, username, gender
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateUser(this.state);
  }

  render() {
    const { name, email, phone, username, gender } = this.state;

    return (
      <div class="card">
        <div class="card-body">
          <div class="tab-content sub-form">
            <div id="individual" class="sub tab-pane fade show active">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="name">Full Name <span class="sup">*</span></label>
                  <input type="text" class="form-control" name="name" value={name} onChange={this.handleChange} />
                </div>
                <div class="form-group row">
                  <div class="col-xs-12 col-sm-6">
                    <label for="plan">Genger <span class="sup">*</span></label>
                    <select name="gender" id="gender" class="form-control" value={gender} onChange={this.handleChange}>
                      <option value="">-- please select --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" value={username} disabled onChange={this.handleChange} />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-xs-12 col-sm-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control disabled" value={email} onChange={this.handleChange} disabled />
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <label for="phone">Phone <span class="sup">*</span></label>
                    <input type="tel" id="phone" name="phone" class="form-control" value={phone} onChange={this.handleChange} />
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
    getUserProfile,
    updateUser
  }
)(PersonalDetails);