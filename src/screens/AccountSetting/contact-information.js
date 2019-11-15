import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  getUserProfile,
  updateUser
} from '../../redux/actions/profileAction';

class ContactInformation extends Component {
  state = {
    id: '',
    address: '',
    country: '',
    state: '',
    city: ''
  };

  componentDidMount() {
    const { profile } = this.props;
    const { id, address, country, state, city } = profile;

    this.setState({
      id, address, country, state, city
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { id, address, city } = this.state;

    this.props.updateUser({ id, address, city });
  }

  render() {
    const { address, country, state, city } = this.state;

    return (
      <div class="card">
        <div class="card-body">
          <div class="tab-content sub-form">
            <div id="individual" class="sub tab-pane fade show active">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="address">Address <span class="sup">*</span></label>
                  <input type="text" name="address" class="form-control" value={address} onChange={this.handleChange} />
                </div>
                <div class="form-group row">
                  <div class="col-xs-12 col-sm-6">
                    <label for="nationality">Country <span class="sup">*</span></label>
                    <select name="country" id="country" class="form-control"></select>
                  </div>

                  <div class="col-xs-12 col-sm-6">
                    <label for="state">State <span class="sup">*</span></label>
                    <select name="state" id="state" class="form-control">
                    </select>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-xs-12 col-sm-6">
                    <label for="city">City <span class="sup">*</span></label>
                    <input type="text" id="city" name="city" class="form-control" value={city} onChange={this.handleChange} />
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
    updateUser
  }
)(ContactInformation);