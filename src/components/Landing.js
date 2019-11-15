import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';

// import loader from "./component/loader"
// import isEmpty from "../../validation/is-empty";

class Landing extends Component {
  constructor(){
    super()
    this.state = {
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Court of Appeal
                </h1>
                <p className="lead"> The Recondite Dictums and Principles of law from the 16 divisions of the Court of Appeal Nigeria.</p>
                <br />
                <br />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>  
      );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, { 
})(withRouter(Landing));
