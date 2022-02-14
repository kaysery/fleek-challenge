import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";

const DrawerMenu = ({ onSearchClick }) => {

  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'status':
        setStatus(event.target.value);
        break;
      case 'gender':
        setGender(event.target.value);
        break;
    }

  }

  const onSearchBtnClick = () => {
    const filters = {};

    if (name) {
      filters['name'] = name;
    }
    if (status) {
      filters['status'] = status;
    }
    if (gender) {
      filters['gender'] = gender;
    }


    onSearchClick({ ...filters });
  }

  return (
    <Box sx={{ flexGrow: 1, paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Toolbar />
      <Typography variant="h4" component="div" gutterBottom>
        Filters
      </Typography>
      <Paper sx={{ borderRadius: '25px', marginBottom: '1rem' }}>
        <InputBase
          sx={{ ml: 2, flex: 1, padding: 1 }}
          placeholder="Filter By Name"
          onChange={handleChange}
          name="name"
          value={name} />
      </Paper>
      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <InputLabel>Status</InputLabel>
        <Select
          labelId="status-select"
          value={status}
          label="Status"
          name="status"
          onChange={handleChange}
        >
          <MenuItem value={'alive'}>Alive</MenuItem>
          <MenuItem value={'dead'}>Dead</MenuItem>
          <MenuItem value={'unknown'}>Unknown</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          labelId="gender-select"
          value={gender}
          label="Gender"
          name="gender"
          onChange={handleChange}
        >
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'genderless'}>Genderless </MenuItem>
          <MenuItem value={'unknown'}>Unknown </MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" endIcon={<SearchIcon />} sx={{ marginTop: '2rem' }} onClick={onSearchBtnClick}>
        Search
      </Button>
    </Box>
  )
}

export default DrawerMenu;