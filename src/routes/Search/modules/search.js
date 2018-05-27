// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST = 'SEARCH_REQUEST'
export const RECEIVE = 'SEARCH_RECEIVE'
export const FAILURE = 'SEARCH_FAILURE'
import { CALL_API } from 'redux-api-middleware';

// ------------------------------------
// Actions
// ------------------------------------
export function search (params) {
  console.log(params);


var endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=`+ params.latitude+`,`+params.longitude+`&hasNextPage=true&nextPage()=true&rankby=distance&type=`+params.type+`&keyword=`+params.keyword+`&key=AIzaSyDcBeUlr4uNQaP9QUAsYK-oEyHgPlKtMCA`;
return {
  [CALL_API]: {
    types: [REQUEST,RECEIVE,FAILURE],
    endpoint: endpoint,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  }
}


}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  search
}

// ------------------------------------
// Action Handlers
// ------------------------------------


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list : {},
  categories:[],
  isLoading:false,
  hasError:false,
}
export default function searchReducer (state = initialState, action) {

  switch(action.type) {

  case REQUEST:
  console.log("request for search")
  	return { ...state, list : {},isLoading:true,hasError:false};
  case RECEIVE:
    return { ...state,list: action.payload,isLoading:false,hasError:false};
  case FAILURE:
    console.log("my request failed")
    return { ...state, list: {},isLoading:false,hasError:true} ;

  default:
    return state;
  }

}
