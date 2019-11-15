import React, { Component } from "react";
import { connect } from "react-redux";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAdmin) {
      this.setState({
        isAdmin: nextProps.auth.isAdmin
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.isAdmin ? (
          <div />
        ) : (
          <footer className="container">
            <div className="row">
              <div className="col">
                <ul>
                  <li>
                    <h4>For Buyers</h4>
                  </li>
            
                  <li>
                    {/* <a href="#">Buyers FAQ</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a> */}
                  </li>
               
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <h4>For Artist</h4>
                  </li>
           
                  {/* <li>
                    <a href="#">Artist Handbook</a>
                  </li> */}
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <h4>About Us</h4>
                  </li>
                  {/* <li>
                    <a href="#">Press</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li> */}
                  {/* <li>
                    <a href="#">Contact Us</a>
                  </li> */}
                  {/* <li>
                    <a href="#">Blog</a>
                  </li> */}
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <h4>Snow Africa</h4>
                  </li>
                  {/* <li>
                    <a href="#">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Copyright Policy</a>
                  </li> */}
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <h4>Top Categories</h4>
                  </li>
                  {/* <li>
                    <a href="#">Paintings</a>
                  </li>
                  <li>
                    <a href="#">Photography</a>
                  </li>
                  <li>
                    <a href="#">Sculpture</a>
                  </li>
                  <li>
                    <a href="#">Drawings</a>
                  </li> */}
                  {/* <li>
                    <a href="#">Collage</a>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* <div className="row" id="logobottom">
              <div className="col">
                <img src="./img/logo_bottom.jpg" alt="" />
              </div>
            </div> */}
            <hr className="divider" />
            <div
              className="row"
              style={{ textAlign: "center", padding: "20px" }}
            >
              Copyright &copy; {new Date().getFullYear()} Snow Africa
            </div>
          </footer>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(Footer);
