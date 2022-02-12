import axios from 'axios';
import {
  FETCH_CHARACTERS_LOADING,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR,
  } from './types/CharacterTypes';

export const fetchCharacterList = (filters) => {
  return dispatch => {
    dispatch(loadingCharacters());

    axios.get(`https://rickandmortyapi.com/api/character`)
      .then(res => {
        setTimeout(()=>{
          dispatch(successCharacters(res.data.results));
        },1500);
      })
      .catch(err => {
        dispatch(errorCharacters());
      });
  };
};


const loadingCharacters = () => ({
    type: FETCH_CHARACTERS_LOADING
  });
  

  const successCharacters = data => ({
    type: FETCH_CHARACTERS_SUCCESS,
    payload: data
   
  });

  const errorCharacters = () => ({
    type: FETCH_CHARACTERS_ERROR
  });