import reducer from './EpisodeReducer';
import * as ActionTypes from "../actions/types/EpisodeTypes";

const initialState = {
    loading: false,
    data: [],
    error: false,
};

const episodeList = [{
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    created: "2017-11-10T12:56:33.798Z"
}];


describe('Reducers::Character', () => {


    it('should set initial state by default', () => {
        const action = { type: 'unknown' };

        expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('should handle FETCH_EPISODES_LOADING', () => {
        const appState = {

        };
        const action = { type: ActionTypes.FETCH_EPISODES_LOADING };
        const expected = {
            loading: true,
            error: false,
        };

        expect(reducer(appState, action)).toEqual(expected);
    });

    
    it('should handle FETCH_EPISODES_SUCCESS', () => {
        const payload =[...episodeList];

        const action = { type: ActionTypes.FETCH_EPISODES_SUCCESS, payload };
        const expected = {
            error: false,
            loading: false,
            data: [...episodeList],
        };

        expect(reducer({}, action)).toEqual(expected);
    });

    it('should handle FETCH_EPISODES_ERROR', () => {
        const payload =[...episodeList];

        const action = { type: ActionTypes.FETCH_EPISODES_ERROR, payload };
        const expected = {
            error: true,
            loading: false,
        };

        expect(reducer({}, action)).toEqual(expected);
    });
});