import './App.css';
import CharacterList from './components/character/CharacterList';
import {Container} from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <CharacterList></CharacterList>
    </Container>
  );
}

export default App;
