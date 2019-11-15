import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '../../redux/actions/forgetPasswordActions';
import { Link } from "react-router-dom";
import TextFieldGroup from '../../components/TextFieldGroup';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {},
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
    };

    this.props.forgotPassword(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="container-fluid"> 
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Reset Password</h1>
              <div id="card_style" className="card"   mb-4 border-0>
                <div className="card-body">
                  <p className="lead text-center">
                    Enter Email to get Reset Link
                  </p>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        label="Email Address"
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        disabled={false}
                      />
                      <div  id = "btnViews" className='form-group'>
                        <button 
                          className="btn btn-dark btn-block" 
                          id="btn-colors"
                          onClick={this.onSubmit}
                          >
                            Send Password Reset Link
                        </button>
                      </div>
                  </form>
                  <div className="form-group row">
                    <hr id="line" className="col-sm-4"/> <p>or</p><hr id="line" className="col-sm-4" />
                  </div>
                  <p className="haveaccount">
                    Remembered Password? <span><Link to="/login"><strong> Back to Login</strong></Link></span>
                  </p>
                  </div>
              </div>
              
            </div>
          </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  forgotPwd: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  forgotPwd: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps, 
  { forgotPassword }
)(ForgotPassword);

