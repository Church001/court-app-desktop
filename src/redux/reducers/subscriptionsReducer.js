import {
  SET_SUBSCRIPTIONS,
  SET_PLANS
} from '../Constants';

const initialState = {
  subscriptions: [],
  plans: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload.subscriptions
      }
    case SET_PLANS:
      return {
        ...state,
        plans: action.payload.plans
      }
    default:
      return state;
  }
}