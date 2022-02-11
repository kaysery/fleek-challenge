import CharacterReducer from './CharacterReducer';
import episodeReducer from './EpisodeReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    charactersList: CharacterReducer,
  })  