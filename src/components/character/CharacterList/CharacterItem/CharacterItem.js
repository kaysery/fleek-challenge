import React from 'react';
import PropTypes from "prop-types";
import { Paper, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const CharacterItem = ({id,name,status,species,image}) => {
    const classes = useStyles();
    return (
        <Paper elevation={2} className={classes.card}>
            <img src={image} className={classes.cardImage}></img>
            <Typography className={classes.title}>{name}</Typography>
            <Typography>{species}</Typography>
            <Typography>{status}</Typography>
            <Button variant="contained" size="large" className={classes.button}>Details</Button>
         </Paper>
    );

}

const useStyles = makeStyles((theme) => ({
    card: {
      padding: ".5rem"
    },
    cardImage:{
        width:'100%',
    },
    button:{
        width: '100%',
        fontWeight: 'bold',
        backgroundColor:'#009600',
        "&:hover": {
          backgroundColor:'#007d00',
        }
    },
    title:{
        fontSize:'1.2rem',
        fontFamily:'Roboto',
        fontWeight: 'bold'
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




