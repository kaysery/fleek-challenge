import React from 'react';
import PropTypes from "prop-types";
import { Paper, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

/*This component is the one that render the as a card on the list of characters*/

const CharacterItem = ({id, name, status, species, image}) => {
    const classes = useStyles();
    const history = useHistory();

    const onDetailsButtonClick = () =>{
        history.push('/'+id);
    }
    return (
        <Paper elevation={2} className={classes.card}>
            <img src={image} className={classes.cardImage}></img>
            <Typography className={classes.title}>{name}</Typography>
            <Typography>{species}</Typography>
            <Typography>{status}</Typography>
            <Button variant="contained" size="large" className={classes.button} onClick={onDetailsButtonClick}>Details</Button>
         </Paper>
    );

}

const useStyles = makeStyles((theme) => ({
    card: {
      padding: "1rem"
    },
    cardImage:{
        width:'100%',
    },
    button:{
        width: '100%',
        fontWeight: 'bold!important',
        color:'#fff!important',
    },
    title:{
        fontSize:'1.2rem!important',
        fontFamily:'Roboto!important',
        fontWeight: 'bold!important',
    }
   
  }));

CharacterItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

export default CharacterItem;




