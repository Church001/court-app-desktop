import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./App.css";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Register from "./screens/Registration/Register";
import Login from "./screens/Login/Login";
import Dashboard from './screens/Dashboard/index';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
//Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot_password" component={ForgotPassword}/>
            </div>
            <Route path="/dashboard" component={Dashboard}/>
          </div>
          <ToastContainer />
        </Router>
      </Provider>
    );
  }
}

export default App;