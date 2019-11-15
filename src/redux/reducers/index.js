import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import forgotPasswordReducer from "./forgetPasswordReducer";
import reportsReducer from './reportsReducer';
import subscriptionsReducer from './subscriptionsReducer';
import supportReducer from './supportReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  forgotPwd: forgotPasswordReducer,
  reports: reportsReducer,
  subscriptions: subscriptionsReducer,
  support: supportReducer,

});
