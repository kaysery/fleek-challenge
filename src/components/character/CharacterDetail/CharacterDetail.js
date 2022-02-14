import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as CharacterActions from "../../../store/actions/CharacterActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Loading from "../../shared/Loading";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const CharacterDetail = ({fetchCharacterById, character}) => {
    const params = useParams();
    useEffect(() => {
        const {id} = params;
        fetchCharacterById(id);
    }, [params]);

    useEffect(() => {
        console.log(character);
    }, [character]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{marginTop: '2rem'}}>
            {character && !character.loading && !character.error && (
                <Grid container spacing={{xs: 2, md: 4}} columns={{xs: 8, sm: 8, md: 12}}>
                    <Grid item xs={3} sm={2} md={2}>
                        <Button sx={{fontSize: '1.8rem'}}>
                            <ArrowBackIosNewIcon fontSize="inherit"/>
                            {'Back'}
                        </Button>
                    </Grid>
                    <Grid item xs={4} sm={5} md={4}>
                        <img src={character?.data.image} style={{width: '100%'}}></img>
                    </Grid>
                    <Grid item xs={4} sm={7} md={6}>
                        <Typography variant="h4" component="div" gutterBottom>{character?.data.id}</Typography>
                        <Typography variant="h4" component="div" gutterBottom>{character?.data.name}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data.status}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data.species}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data.type}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data.gender}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data?.origin?.name}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data.created}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h5" component="div" gutterBottom>{'Episoded info'}</Typography>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Item One"  />
                                    <Tab label="Item Two" />
                                    <Tab label="Item Three"  />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                Item One
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>

                    </Grid>
                </Grid>
            )}
            {character && character?.loading && !character?.error && <Loading />}
        </Box>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {...bindActionCreators(CharacterActions, dispatch)}
}
CharacterDetail.propTypes = {
    fetchCharacterList: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        character: state.characters.selectedCharacter,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);