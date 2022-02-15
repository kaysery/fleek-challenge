import axios from 'axios';
import {
    FETCH_EPISODES_LOADING,
    FETCH_EPISODES_SUCCESS,
    FETCH_EPISODES_ERROR,
} from './types/EpisodeTypes';

export const fetchEpisodeList = (episodes) => {
    return dispatch => {
        dispatch(loadingEpisodes());
        const episodesGetList = episodes.map( epi => axios.get(epi) );

       return Promise.all(episodesGetList)
            .then(res => {
                /*the setTimeout it's only to show you the loading spinner 😄 
                if you want to try the normal implementation just comment the setTimeout code and
                uncomment the commented code below
                */
               
                //dispatch(successEpisodes(res.map(item => item.data)));

                setTimeout(() => {
                    dispatch(successEpisodes(res.map(item => item.data)));
                }, 1500);
            })
            .catch(err => {
                dispatch(errorEpisodes());
            });
    };
};


const loadingEpisodes = () => ({
    type: FETCH_EPISODES_LOADING
});


const successEpisodes = data => ({
    type: FETCH_EPISODES_SUCCESS,
    payload: data

});

const errorEpisodes = () => ({
    type: FETCH_EPISODES_ERROR
});