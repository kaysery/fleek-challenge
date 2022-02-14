import './App.css';
import CharacterList from './components/character/CharacterList';
import CharacterDetail from './components/character/CharacterDetail';
import Header from './components/shared/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NotFound from './components/shared/NotFound';

const theme = createTheme({
    palette: {
        primary: {
            main: '#54ea0f',
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Header>
            <Switch>
                <Route exact path="/">
                        <CharacterList/>
                </Route>
                <Route path="/:id" exact>
                        <CharacterDetail/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
            </Header>
        </Router>
        </ThemeProvider>
    );
}

export default App;
