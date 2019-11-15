import {
  SET_SUPPORT_THREADS,
  SET_SUPPORT_THREAD_MESSAGES
} from '../Constants';

const initialState = {
  threads: [],
  messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SUPPORT_THREADS:
      return {
        ...state,
        threads: action.payload.threads
      }
    case SET_SUPPORT_THREAD_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages
      }
    default: 
      return state;
  }
}