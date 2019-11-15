import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";
// import TextFieldGroup from "../../components/TextFieldGroup";

// import './Login.css';
// import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isSubmitting: false,
      required: true
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        isSubmitting: false
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({ isSubmitting: true });
    this.props.loginUser(userData, this.props.history);
  }; 

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container" >
          <div className="row">
            <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Login</h2>
              <div className="form-holder">
                <div>
                  <form>
                    <h2>Welcome Back !</h2>
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
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={this.state.email}
                        placeholder="Email Address"
                        onChange={this.onChange}
                        className='form-control'
                      />
                      {errors.email && (
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
                        className='form-control'
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                      <p id="forgot-pwd"><Link to="/forgot_password"><strong>Forgot Your Password?</strong></Link></p>
                    </div>
                    <div className='form-group'>
                      <button 
                        className="btn btn-dark btn-block" 
                        id="btn-color"
                        onClick={this.onSubmit}
                        >
                          Login
                      </button>
                    </div>
                  </form>
                  <div className="form-group row">
                  <hr id="line" className="col-sm-4"/> <p>or</p><hr id="line" className="col-sm-4" />
                  </div>
                  <p className="haveaccount">
                  New user? <span><Link to="/register"> <strong> Create an account</strong></Link></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
