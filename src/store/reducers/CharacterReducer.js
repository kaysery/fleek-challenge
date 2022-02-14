import {
    FETCH_CHARACTERS_ERROR,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_LOADING,
    FETCH_SINGLE_CHARACTER_LOADING,
    FETCH_SINGLE_CHARACTER_SUCCESS,
    FETCH_SINGLE_CHARACTER_ERROR,
} from '../actions/types/CharacterTypes';

const initialState = {
    loading: false,
    data: [],
    error: false,
    selectedCharacter: {
        loading: false,
        data: {},
        error: false,
    }
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
                pagination: action.payload.info
            };
        case FETCH_CHARACTERS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case FETCH_SINGLE_CHARACTER_LOADING:
            return {
                ...state,
                selectedCharacter: {
                    ...state.selectedCharacter,
                    data: action.payload,
                    loading: true,
                    error: false,
                }
            };

        case FETCH_SINGLE_CHARACTER_SUCCESS:
            return {
                ...state,
                selectedCharacter: {
                    ...state.selectedCharacter,
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        case FETCH_SINGLE_CHARACTER_ERROR:
            return {
                ...state,
                selectedCharacter: {
                    ...state.selectedCharacter,
                    data: action.payload,
                    loading: false,
                    error: true,
                }
            };
        default:
            return state;
    }
}