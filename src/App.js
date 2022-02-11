import logo from './logo.svg';
import './App.css';
import CharacterContent from './components/CharacterContent';
import {Container} from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <CharacterContent></CharacterContent>
    </Container>
  );
}

export default App;
