export const BASE_URL = 'https://courtofappealreportsnigeria.com/';
const LoginEndpoint = `${BASE_URL}api/login`,
  RegisterEndpoint = `${BASE_URL}api/users`,
  ProfileEndpoint = `${BASE_URL}api/users/me`,
  UpdateProfileEndoint = `${BASE_URL}profile`,
  VerificationEndpoint = `${BASE_URL}api/users/`,
  CreateInvestment = `${BASE_URL}api/investments`,
  UpdateUserEndpoint = `${BASE_URL}api/users`,
  getAllReport = `${BASE_URL}api/reports`,
  WithdrawInvestment = `${BASE_URL}api/investments/`,
  WithdrawReferal = `${BASE_URL}api/users/`,
  CreateSupport = `${BASE_URL}api/support`,
  AllListofSupport = `${BASE_URL}api/users`,
  TicketMessageEndpoint = `${BASE_URL}api/support/`,
  GetAllMessageEndPoint = `${BASE_URL}api/support`,
  ChangePassword = `${BASE_URL}api/users/`,
  ForgotPassword = `${BASE_URL}api/users/password/forgot`,
  PlanEndpoint = `${BASE_URL}api/plans`,
  AddFavoriteEndPoint = `${BASE_URL}api/reports/`,
  AddReadLaterEndPoint = `${BASE_URL}api/reports/`,
  GetFavoriteEndpoint = `${BASE_URL}api/reports/favorite`,
  GetReadLaterEndpoint = `${BASE_URL}api/reports/future`,
  DeleteFavoriteEndpoint = `${BASE_URL}api/reports/`,
  DeleteReadLaterEndpoint = `${BASE_URL}api/reports/`,
  GetCategoryEndpoint = `${BASE_URL}api/categories/`,
  GetDivisionEndpoint = `${BASE_URL}api/divisions/`,
  GetAllSubscription = `${BASE_URL}api/users/`,
  GetReportEndpoint = `${BASE_URL}api/reports/`,
  UserLogoutEndpoint = `${BASE_URL}api/logout`;
  
export {
  LoginEndpoint,
  RegisterEndpoint,
  ProfileEndpoint,
  UpdateProfileEndoint,
  VerificationEndpoint,
  CreateInvestment,
  UpdateUserEndpoint,
  getAllReport,
  WithdrawInvestment,
  WithdrawReferal,
  CreateSupport,
  AllListofSupport,
  TicketMessageEndpoint,
  GetAllMessageEndPoint,
  ChangePassword,
  ForgotPassword,
  PlanEndpoint,
  AddFavoriteEndPoint,
  AddReadLaterEndPoint,
  GetFavoriteEndpoint,
  GetReadLaterEndpoint,
  DeleteFavoriteEndpoint,
  DeleteReadLaterEndpoint,
  GetCategoryEndpoint,
  GetDivisionEndpoint,
  GetAllSubscription,
  GetReportEndpoint,
  UserLogoutEndpoint,
}
// db.ensureIndex({ fieldName: 'id', unique: true });


export const postRoute = (endpoint, body) => {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
     body : JSON.stringify(body),
    })
    .then((res) => {
      return res;
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return error;
  });
}

export const postWithToken = (endpoint, body, token) => {
  console.log({endpoint : endpoint,
    body : body,
    token : token,
  })
  return fetch(endpoint, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body : JSON.stringify(body),
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error;
  });
}
export const postToken = (endpoint, token) => {
  
  return fetch(endpoint, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify('')

  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error;
  });
}

export const getRoute = (endpoint) => {
  return fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error
  });
}

export const getRouteToken = (endpoint, token) => {
  return fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error
  });
}

export const putRoute = (endpoint, body, token) => {
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'    
    },
    body: body
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error;
  });
}

// export const subscription = async(status) => {
//   await AsyncStorage.removeItem('subscription');
//   return await AsyncStorage.setItem('subscription', status)
// }

// export const getSubscription = async()=> {
//   return await AsyncStorage.getItem('subscription')
//     .then((value) => {
//       if (value == 'active') {
//         return true
//       } else {
//         return false;
//       }
//   });
// }


