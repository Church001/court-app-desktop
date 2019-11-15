import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import classnames from "classnames"
import axios from "axios";
import { getUserProfile } from "../../redux/actions/profileAction";
import {getAllReport} from "../../utils/utils";
class Security extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      profile: {},
      token: "",
      data: []
    };
  }

  async componentDidMount (){
    const token = localStorage.getItem("jwtToken");
    await this.handleGetProfile();
    await this.setState({
      token: token
    });
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.profile) {
      console.log({newxPropppppp: nextProps.profile})

      this.setState({
        profile: nextProps.profile,
      })
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }

  }
  handleGetProfile =()=>{
    this.props.getUserProfile()
  }
  handleGetAllReport = async() => {
    try {
      return await this.allReport()
    }
    catch(error) {
      return this.showNotification('error', 'Message', error.toString());
    }
  }
  // Call all reports

  allReport = async() =>{
    const {token} = this.state;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    await axios(getAllReport, token, {
      "headers" : headers
    })
      .then((res) => {
        if (typeof res.message !== 'undefined') {  
          return this.showNotification('error', 'Message', res.message);
        }   
        else {    
          this.setState({
            data: res.data, 
          });
          return this.hideLoadingDialogue();
        }
      }
    )
    .catch(error=>
      this.showNotification('error', 'Message', error.toString()));
  
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { profile, errors } = this.state;
    console.log("PROFILE_SUCCESS", profile);
    return (
      <div className="register">
        <div className="card ">
          <div className="card-body">
            <ul className="nav account-head">
                <li><a id="navLnik" className=" navbar-brand" href="/account_setting">Personal Details</a></li>
                <li><a id="navLnik" className=" navbar-brand" href="/contact_information">Contact Information</a></li>
                <li><a id="navLnik" className="active navbar-brand" href="/security">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div id="card_style" className="card" >
          <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group col-md-6">
                  <label htmlFor="firstname">Old Password *</label>
                  <input
                    type="text"
                    id="firstname"
                    className='form-control'
                    placeholder=""
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  {
                    this.state.errors.name !== "" && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
               
                {/* Email and phone Container */}
                  <div className="form-group col-md-6">
                    <label htmlFor="firstname">New Password *</label>
                    <input
                      type="text"
                      id="firstname"
                      className='form-control'
                      placeholder=""
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                    />
                    {
                      this.state.errors.name !== "" && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="firstname">Confirm Password *</label>
                    <input
                      type="text"
                      id="firstname"
                      className='form-control'
                      placeholder=""
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                    />
                    {
                      this.state.errors.name !== "" && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                <div id="btnView" className='form-group'>
                  <button 
                    className="btn btn-dark btn-block" 
                    id="btn-color"
                    onClick={this.onSubmit}>
                    Update
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Security.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(withRouter(Security));
