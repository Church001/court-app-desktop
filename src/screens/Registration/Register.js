import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
// import classnames from 'classnames';
import './Registration.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber:"",
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      isSubmitting: false
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        // isSubmitting: false
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    
    e.preventDefault();
    const firstname = this.state.firstName,
      lastname = this.state.lastName;
    const createUser = {
      name: `${firstname} ${lastname}`,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phoneNumber,
      username: this.state.username
    };

    if (this.comparePasswords(this.state.password, this.state.password2) === false) {
      return;
    }
    this.setState({ isSubmitting: true });
    this.props.registerUser(createUser, this.props.history);
  };
  
  comparePasswords = (password, password2) => {
    if (password !== password2) {
      const message = {
        message: "Passwords do not match"
      };
      this.setState({ errors: message });
      return false;
    }
  };
  render() {
    const { errors } = this.state;
    console.log({ERRORS: errors});

    return (
      <div className="register">
        <div className="container" >
          <div className="row">
            <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Register</h2>
              <p className="lead text-center">
                Create your E-Car account
              </p>
            
                  <form noValidate onSubmit={this.onSubmit}>
                    {this.state.errors !== "" && (
                      <div
                        style={{
                          color: "#f05050",
                          textAlign: "center",
                          fontWeight: "bold",
                          paddingBottom: "20px"
                        }}
                      >
                        {errors.message}
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="firstname">First name</label>
                      <input
                        type="text"
                        id="firstname"
                        className='form-control form-control-lg'
                        placeholder="Enter First Name"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.onChange}
                      />
                      {
                        this.state.errors.name !== "" && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        id="lastname"
                        name="lastName"
                        type="text"
                        required
                        value={this.state.lastName}
                        placeholder="Enter Last Name"
                        onChange={this.onChange}
                        className='form-control form-control-lg'
                      />
                      {
                        errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phonenumber">Phone Number</label>
                      <input
                        type="text"
                        id="phonenumber"
                        className='form-control form-control-lg'
                        placeholder="Enter Phone Number"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.onChange}
                      />
                      {
                        errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={this.state.username}
                        placeholder="Enter User Name"
                        onChange={this.onChange}
                        className='form-control form-control-lg'
                      />
                      {
                        errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={this.state.email}
                        placeholder="Email Address"
                        onChange={this.onChange}
                        className='form-control form-control-lg'
                      />
                      {
                        errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.onChange}
                        className='form-control form-control-lg'
                      />
                      {
                        errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                      <p><small>Your password must be at least 8 characters long.</small></p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input
                        id="confirm-password"
                        name="password2"
                        type="password"
                        required
                        value={this.state.password2}
                        placeholder="Confirm Password"
                        onChange={this.onChange}
                        className='form-control form-control-lg'
                      />
                    </div>
                    <div className="form-group form-check">
                      <input
                        id="terms-condition"
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label 
                        className="form-check-label" 
                        htmlFor="exampleCheck1">I agree to the <span><Link to="/login"> <strong> Terms & Conditions</strong></Link></span>
                      </label>
                    </div>
                    <div className='form-group'>
                      <button type="submit" className="btn btn-dark btn-block" id="btn-color">Register</button>
                    </div>
                  </form>
                  <div className="form-group row">
                    <hr id="line" className="col-sm-4"/> <p>or</p><hr id="line" className="col-sm-4" />
                  </div>
                  <p className="haveaccount">
                    Already have an account?<span><Link to="/login"><strong>Sign In</strong></Link></span>
                  </p>
          
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
