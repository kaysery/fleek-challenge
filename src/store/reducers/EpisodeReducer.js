import {
    FETCH_EPISODES_ERROR,
    FETCH_EPISODES_SUCCESS,
    FETCH_EPISODES_LOADING,
} from '../actions/types/EpisodeTypes';

const initialState = {
    loading: false,
    data: [],
    error: false,
};

export default function EpisodeReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_EPISODES_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case FETCH_EPISODES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            };
        case FETCH_EPISODES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
         default:
             return state;   
        }
}