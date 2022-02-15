import reducer from './CharacterReducer';
import * as ActionTypes from "../actions/types/CharacterTypes";

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

const charactersList = [{
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
}
];

const paginationInfo =
{
    count: 826,
    pages: 42,
    next: "https://rickandmortyapi.com/api/character?page=2",
    prev: null
};


describe('Reducers::Character', () => {


    it('should set initial state by default', () => {
        const action = { type: 'unknown' };

        expect(reducer(undefined, action)).toEqual(initialState);
    });

    it('should handle FETCH_CHARACTERS_LOADING', () => {
        const appState = {

        };
        const action = { type: ActionTypes.FETCH_CHARACTERS_LOADING };
        const expected = {
            loading: true,
            error: false,
        };

        expect(reducer(appState, action)).toEqual(expected);
    });

    it('should handle FETCH_CHARACTERS_SUCCESS', () => {
        const payload =
        {
            results: [...charactersList],
            info: { ...paginationInfo }
        };

        const action = { type: ActionTypes.FETCH_CHARACTERS_SUCCESS, payload };
        const expected = {
            error: false,
            loading: false,
            data: [...charactersList],
            pagination: { ...paginationInfo },
        };

        expect(reducer({}, action)).toEqual(expected);
    });

    it('should handle FETCH_CHARACTERS_ERROR', () => {
        const payload =
        {
            results: [...charactersList],
            info: { ...paginationInfo }
        };

        const action = { type: ActionTypes.FETCH_CHARACTERS_ERROR, payload };
        const expected = {
            error: true,
            loading: false,
        };

        expect(reducer({}, action)).toEqual(expected);
    });

    it('should handle FETCH_SINGLE_CHARACTER_LOADING', () => {
        const action = { type: ActionTypes.FETCH_SINGLE_CHARACTER_LOADING };
        const expected = {
            selectedCharacter: {
                loading: true,
                error: false,
            }
        };

        expect(reducer({}, action)).toEqual(expected);
    });

    it('should handle FETCH_SINGLE_CHARACTER_SUCCESS', () => {
        const payload = { ...charactersList[0] };

        const action = { type: ActionTypes.FETCH_SINGLE_CHARACTER_SUCCESS, payload };
        const expected = {
            selectedCharacter: {
                error: false,
                loading: false,
                data: {...charactersList[0]}
            }
        };

        expect(reducer({}, action)).toEqual(expected);
    });

    it('should handle FETCH_SINGLE_CHARACTER_ERROR', () => {
        const payload = { ...charactersList[0] };

        const action = { type: ActionTypes.FETCH_SINGLE_CHARACTER_ERROR, payload };
        const expected = {
            selectedCharacter: {
                error: true,
                loading: false,
                data: {...charactersList[0]}
            }
        };

        expect(reducer({}, action)).toEqual(expected);
    });
});
