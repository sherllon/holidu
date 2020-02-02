import { GET_LISTINGS, INITIALIZE, UPDATE_SORT_BY } from "../constants/action-types";

const initialState = {
  listings: [],
  isLoading: true,
  sortBy: ''
};

function rootReducer(state = initialState, action) {
  if(action.type === GET_LISTINGS) {
      return state.listings;
  }
  else if(action.type === INITIALIZE) {
      return Object.assign({}, state, { listings: action.json.offers, isLoading: action.isLoading});
  }
  else if(action.type === UPDATE_SORT_BY) {
      return Object.assign({}, state, {sortBy: action.sortBy})
  }
  return state;
};

export default rootReducer;
