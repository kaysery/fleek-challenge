import CharacterReducer from './CharacterReducer';
import EpisodeReducer from './EpisodeReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    characters: CharacterReducer,
    episodes: EpisodeReducer,
  })  