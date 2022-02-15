import * as ActionTypes from "./types/EpisodeTypes";
import * as ActionCreators from "./EpisodeActions";
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

  const episodeList = [
    {
        id: 1,
        name: "Pilot",
        air_date: "December 2, 2013",
        episode: "S01E01",
        url: "https://rickandmortyapi.com/api/episode/1",
        created: "2017-11-10T12:56:33.798Z"
        }
  ];
  
  const delay = (millis) => new Promise( resolve => setTimeout(resolve, millis));

  it("should fetch episodes list", async () => {

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: episodeList[0]
      });
    });

    await ActionCreators.fetchEpisodeList(['https://rickandmortyapi.com/api/episode/1'])(dispatch);

    const expected = [
      {
        type: ActionTypes.FETCH_EPISODES_LOADING,
      },
      {
        type: ActionTypes.FETCH_EPISODES_SUCCESS,
        payload: episodeList,
      },
    ];

    await delay(1500);
    expect(dispatch.mock.calls.flat()).toEqual(expected);

  });

  it("should fail to fetch episodes list", async () => {
    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: []
      });
    });

    await ActionCreators.fetchEpisodeList(['https://rickandmortyapi.com/api/episode/1'])(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_EPISODES_LOADING,
      },
      {
        type: ActionTypes.FETCH_EPISODES_ERROR,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
  
});
