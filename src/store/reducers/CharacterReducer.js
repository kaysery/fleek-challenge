import {
    FETCH_CHARACTERS_ERROR,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_LOADING,
  } from '../actions/types/CharacterTypes';
  
  const initialState = {
    loading: false,
    data: [],
    error: false
  };
  
  export default function CharacterReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_CHARACTERS_LOADING:
        return {
          ...state,
          loading: true,
          error: false,
        };
      case FETCH_CHARACTERS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          data: action.payload.results,
          pagination:action.payload.info
        };
      case FETCH_CHARACTERS_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        };
      default:
        return state;
    }
  }