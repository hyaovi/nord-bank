import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = null;
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS: {
      return action.payload;
    }
    case CLEAR_ERRORS: {
      return null;
    }
    default:
      return state;
  }
}
