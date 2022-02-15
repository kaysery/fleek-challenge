import * as ActionTypes from "./types/CharacterTypes";
import * as ActionCreators from "./CharacterActions";
import moxios from "moxios";

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
  });

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const charactersList = [{
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  }
  ];
  const delay = (millis) => new Promise( resolve => setTimeout(resolve, millis));

  it("should fetch character list", async () => {

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: charactersList
      });
    });

    await ActionCreators.fetchCharacterList({})(dispatch);

    const expected = [
      {
        type: ActionTypes.FETCH_CHARACTERS_LOADING,
      },
      {
        type: ActionTypes.FETCH_CHARACTERS_SUCCESS,
        payload: charactersList,
      },
    ];

    await delay(1500);
    expect(dispatch.mock.calls.flat()).toEqual(expected);

  });

  it("should fail to fetch character list", async () => {
    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: []
      });
    });

    await ActionCreators.fetchCharacterList({})(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_CHARACTERS_LOADING,
      },
      {
        type: ActionTypes.FETCH_CHARACTERS_ERROR,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });


  it("should fetch single character by id", async () => {

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: charactersList[0]
      });
    });

    await ActionCreators.fetchCharacterById(1)(dispatch);

    const expected = [
      {
        type: ActionTypes.FETCH_SINGLE_CHARACTER_LOADING,
      },
      {
        type: ActionTypes.FETCH_SINGLE_CHARACTER_SUCCESS,
        payload: charactersList[0],
      },
    ];

    await delay(1500);
    expect(dispatch.mock.calls.flat()).toEqual(expected);

  });

  it("should fail to fetch single character by id", async () => {
    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: []
      });
    });

    await ActionCreators.fetchCharacterById(1)(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_SINGLE_CHARACTER_LOADING,
      },
      {
        type: ActionTypes.FETCH_SINGLE_CHARACTER_ERROR,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  
  
});
