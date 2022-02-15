import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as CharacterActions from "../../../store/actions/CharacterActions";
import * as EpisodeActions from "../../../store/actions/EpisodeActions";
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
import useMediaQuery from '@mui/material/useMediaQuery';

const MAX_NUMBER_EPISODES = 5;
/*This component is the one that render the details
*about a specific  character
* */
const CharacterDetail = ({fetchCharacterById, character, fetchEpisodeList, episodes}) => {
    const params = useParams();
    const history = useHistory();
    const [currentTab, setCurrentTab] = React.useState(0);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.up('xs'));

    //getting the id from the path param /:id
    useEffect(() => {
        const {id} = params;
        fetchCharacterById(id);
    }, [params]);

    //calling the episodes details once the character details was loaded successfully
    useEffect(() => {
        if (character && !character?.loading && !character?.error && character?.data?.episode) {
            let episodesTemp = [...character.data.episode];
            if (episodesTemp.length > MAX_NUMBER_EPISODES) {
                episodesTemp = [...episodesTemp.slice(0, MAX_NUMBER_EPISODES)];
            }
            fetchEpisodeList(episodesTemp);
        }

    }, [character]);


    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const onBackButtonClick = () => {
        history.goBack();
    }

    return (
        <Box sx={{marginTop: '2rem'}}>
            {character && !character.loading && !character.error && (
                <Grid container spacing={{xs: 2, md: 4}} columns={{xs: 8, sm: 8, md: 12}}>
                    <Grid item xs={3} sm={2} md={2}>
                        <Button sx={{fontSize: '1.8rem'}} onClick={onBackButtonClick}>
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
                        <Typography variant="h5" component="div"
                                    gutterBottom>{character?.data?.origin?.name}</Typography>
                        <Typography variant="h5" component="div" gutterBottom>{character?.data.created}</Typography>
                    </Grid>

                    <Grid item xs={5} sm={6} md={12}>
                        <Typography variant="h5" component="div" gutterBottom>{'Episoded info'}</Typography>
                        {episodes && !episodes.loading && !episodes.error && (
                            <Box sx={{width: '100%',maxWidth: (isMobile?'450px':'') }}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <Tabs value={currentTab}
                                          onChange={handleTabChange}
                                          aria-label="episode tabs"
                                          variant="scrollable"
                                          allowScrollButtonsMobile
                                          scrollButtons
                                    >
                                        {episodes.data.map(episode => <Tab label={`Episode ${episode.id}`}
                                                                           key={`${episode.id}-${episode.url}`}/>)}
                                    </Tabs>
                                </Box>


                                {episodes.data.map((episode, index) => <TabPanelEpisode value={currentTab}
                                                                                        index={index} {...episode}
                                                                                        key={`${episode.id}-${episode.url}`}/>)}

                            </Box>
                        )
                        }
                        {episodes && episodes?.loading && !episodes?.error && <Loading/>}

                    </Grid>
                </Grid>
            )}
            {character && character?.loading && !character?.error && <Loading/>}
        </Box>
    );
}

function TabPanelEpisode(props) {
    const {value, index, ...restProps} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography variant="h5" component="div" gutterBottom>{restProps.id}</Typography>
                    <Typography variant="h5" component="div" gutterBottom>{restProps.name}</Typography>
                    <Typography variant="h5" component="div" gutterBottom>{restProps.air_date}</Typography>
                    <Typography variant="h5" component="div" gutterBottom>{restProps.episode}</Typography>
                </Box>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(CharacterActions, dispatch),
        ...bindActionCreators(EpisodeActions, dispatch)
    }
}
CharacterDetail.propTypes = {
    fetchCharacterList: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        character: state.characters.selectedCharacter,
        episodes: state.episodes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);