import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import RickAndMortyLogo from '../../../assets/images/RickAndMortyLogo.png'
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";
import useDrawer from "../../../hooks/useDrawer";
import DrawerMenu from '../DrawerMenu';
import { ObjToQueryParamsString, isEmpty }  from '../../../utils';
import { useHistory } from 'react-router-dom';

const DEFAULT_DRAWER_WIDTH = 340;

const useStyles = makeStyles((theme) => ({
    logo:{
         width:'16rem',
         height:'6rem',
         margin:'auto'
    }
}));

  const Header = ({window, children})=> {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerWidth,setDrawerWidth] = useState(DEFAULT_DRAWER_WIDTH);
  const withDrawer = useDrawer();
  const history = useHistory();

  const onSearchClick = (filters) =>{

    if(!isEmpty(filters)){
      history.push({
        search: ObjToQueryParamsString({...filters,page:1})
      });
    }
  }

  useEffect(()=>{
      setDrawerWidth(withDrawer? DEFAULT_DRAWER_WIDTH:0);
  },[withDrawer]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    const classes = useStyles();
    const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
       <CssBaseline />
       <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
            {withDrawer && <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> }
              <img className={classes.logo} src={RickAndMortyLogo} alt={'Logo'}/>
        </Toolbar>
      </AppBar>
        {withDrawer &&  <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerMenu onSearchClick={onSearchClick}/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerMenu  onSearchClick={onSearchClick}/>
        </Drawer>
      </Box>}
      <Box
        component="main"
        sx={{ 
             flexGrow: 1,
             p: 3,
             width: { sm: `calc(100% - ${drawerWidth}px)` },
             maxWidth:'1000px',
             marginTop:'5rem',
             marginLeft:'auto',
             marginRight:'auto' }}>
     
      {children}
    </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.element,
};

export default Header;