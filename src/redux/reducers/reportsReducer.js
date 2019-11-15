import {
  SET_ALL_REPORTS,
  SET_FAVORITES,
  SET_READ_LATER_REPORTS,
  SET_DIVITION,
  SET_CATEGORY,
} from '../Constants';

const initialState = {
  allReports: [],
  favorites: [],
  readLaterReports: [],
  categories: [],
  divisions: [],

};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {...state,
        categories: action.payload
      }
    case SET_DIVITION:
      return {
        ...state,
        divisions: action.payload
      }
    case SET_ALL_REPORTS:
      return {
        ...state,
        allReports: action.payload.reports
      }
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload.favorites
      }
    case SET_READ_LATER_REPORTS:
      return {
        ...state,
        readLaterReports: action.payload.readLaterReports
      }

    default:
      return state;
  }
}