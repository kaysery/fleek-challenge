import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as CharacterActions from '../../redux/actions/CharacterActions';


const CharacterContent = ({fetchCharacterList,characters}) => {
    useEffect(()=>{
        fetchCharacterList();
    },[]);

    useEffect(()=>{
       console.log('llamando esto',characters);
    },[characters?.loading]);

    return (
          <div>my new component</div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {...bindActionCreators(CharacterActions,dispatch)}
  }

  const mapStateToProps = (state)=>{
      return {
          characters: state.charactersList,
      }
  }

export default connect(mapStateToProps,mapDispatchToProps)(CharacterContent)




