import { GET_LISTINGS, INITIALIZE, UPDATE_SORT_BY } from "../constants/action-types";


export function getListings(payload) {
  return { type: GET_LISTINGS, payload }
};

export function initializeState(json) {
    return {type: INITIALIZE, json};
}

export function updateSortBy(sortBy) {
    return {type: UPDATE_SORT_BY, sortBy};
}
