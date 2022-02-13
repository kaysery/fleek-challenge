import axios from 'axios';
import {
    FETCH_CHARACTERS_LOADING,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_ERROR,
} from './types/CharacterTypes';

export const fetchCharacterList = (filters) => {
    return dispatch => {
        dispatch(loadingCharacters());
        let qs = '';
        if (filters)
            qs = Object.keys(filters)
                .map(key => `${key}=${filters[key]}`)
                .join('&');

        axios.get(`https://rickandmortyapi.com/api/character?${qs}`)
            .then(res => {
                setTimeout(() => {
                    dispatch(successCharacters(res.data));
                }, 1500);
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