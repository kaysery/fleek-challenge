import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as CharacterActions from '../../../store/actions/CharacterActions';
import CharacterItem from './CharacterItem';
import { Grid, Pagination } from '@mui/material';
import Loading from '../../shared/Loading';


const CharacterList = ({fetchCharacterList,characters}) => {

    const [page,setPage] = useState(1);
    const [count,setCount] = useState(0);
    useEffect(()=>{
        fetchCharacterList({page});
    },[page]);

    useEffect(()=>{
        setCount(characters?.pagination?.pages);
    },[characters?.pagination]);

    const handlePagination = (event, value) =>{
           setPage(value);
    }

    return (
        <>
        { characters?.loading && !characters?.error && <Loading/> }
         <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
             {characters && !characters?.loading && characters.data.map((item, index) => (
                 <Grid item xs={4} sm={4} md={4} key={index}>
                     <CharacterItem {...item}></CharacterItem>
                 </Grid>
             ))
             }
          </Grid>
            {characters && !characters?.loading && <Pagination count={count} page={page} onChange={handlePagination} />}
          </>
    );

}

CharacterList.propTypes = {
    fetchCharacterList: PropTypes.func.isRequired,
    characters: PropTypes.object.isRequired,
  };

const mapDispatchToProps = (dispatch) => {
    return { ...bindActionCreators(CharacterActions,dispatch) }
  }

  const mapStateToProps = (state)=>{
      return {
          characters: state.charactersList,
      }
  }

export default connect(mapStateToProps,mapDispatchToProps)(CharacterList)




