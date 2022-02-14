import axios from 'axios';
import {
    FETCH_CHARACTERS_LOADING,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_ERROR,
    FETCH_SINGLE_CHARACTER_SUCCESS,
    FETCH_SINGLE_CHARACTER_LOADING,
    FETCH_SINGLE_CHARACTER_ERROR,
} from './types/CharacterTypes';
import { ObjToQueryParamsString }  from '../../utils';

export const fetchCharacterById = (id) => {
    return dispatch => {
        dispatch(loadingSingleCharacter());

        axios.get(`https://rickandmortyapi.com/api/character/`+id)
            .then(res => {
                /*the setTimeout it's only to show you the loading spinner 😄 
                if you want to try the normal implementation just comment the setTimeout code and
                uncomment the commented code below
                */

                //dispatch(successSingleCharacter(res.data));
                
                setTimeout(() => {
                    dispatch(successSingleCharacter(res.data));
                }, 1500);
            })
            .catch(err => {
                dispatch(errorSingleCharacter());
            });
    };
}

export const fetchCharacterList = (filters) => {
    return dispatch => {
        dispatch(loadingCharacters());
        let qs = '';
        if (filters)
            qs = ObjToQueryParamsString(filters);

        axios.get(`https://rickandmortyapi.com/api/character?${qs}`)
            .then(res => {
                /*the setTimeout it's only to show you the loading spinner 😄 
                if you want to try the normal implementation just comment the setTimeout code and
                uncomment the commented code below
                */

                //dispatch(successCharacters(res.data));
                
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


const loadingSingleCharacter = () => ({
    type: FETCH_SINGLE_CHARACTER_LOADING
});


const successSingleCharacter = data => ({
    type: FETCH_SINGLE_CHARACTER_SUCCESS,
    payload: data

});

const errorSingleCharacter = () => ({
    type: FETCH_SINGLE_CHARACTER_ERROR
});