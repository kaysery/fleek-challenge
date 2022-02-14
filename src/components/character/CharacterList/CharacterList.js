import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as CharacterActions from '../../../store/actions/CharacterActions';
import CharacterItem from './CharacterItem';
import { Grid, Pagination } from '@mui/material';
import Loading from '../../shared/Loading';
import { useLocation, useHistory } from 'react-router-dom';
import ErrorFetchingImage from '../../../assets/images/image-error-fetching.png';
import { queryStringToObj, ObjToQueryParamsString } from '../../../utils';
import Box from '@mui/material/Box';


const CharacterList = ({ fetchCharacterList, characters }) => {

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { search } = useLocation();
    const history = useHistory();

    useEffect(() => {
        const filterValues = new URLSearchParams(search);
        const filterObj = queryStringToObj(filterValues);
        setPage(Number(filterObj?.page));
        fetchCharacterList({ ...filterObj });
    }, [search]);


    useEffect(() => {
        setCount(characters?.pagination?.pages);
    }, [characters?.pagination]);

    const handlePagination = (event, value) => {
        const filterValues = new URLSearchParams(search);
        const filters = queryStringToObj(filterValues);
        filters['page'] = value;
        history.push({ search: ObjToQueryParamsString(filters) });
    }

    return (
        <>
            {characters?.loading && !characters?.error && <Loading />}
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {characters && !characters?.loading && !characters.error && characters.data.map((item, index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <CharacterItem {...item}></CharacterItem>
                    </Grid>
                ))
                }
            </Grid>
            {characters && !characters?.loading && !characters.error &&
                <Box sx={{marginTop:'2rem',display:'flex',justifyContent:'center'}}>
                    <Pagination size='large' count={count} page={page || 1} onChange={handlePagination} />
                </Box>
            }
            {characters && !characters?.loading && characters.error && <img style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '3rem'
            }} src={ErrorFetchingImage}></img>}
        </>
    );

}

CharacterList.propTypes = {
    fetchCharacterList: PropTypes.func.isRequired,
    characters: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return { ...bindActionCreators(CharacterActions, dispatch) }
}

const mapStateToProps = (state) => {
    return {
        characters: state.characters,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList)




