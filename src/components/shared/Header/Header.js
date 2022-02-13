import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import RickAndMortyLogo from '../../../assets/images/RickAndMortyLogo.png'
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import {useEffect, useState} from "react";
import useDrawer from "../../../hooks/useDrawer";

const DEFAULT_DRAWER_WIDTH = 240;

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

  useEffect(()=>{
      setDrawerWidth(withDrawer? DEFAULT_DRAWER_WIDTH:0);
  },[withDrawer]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    const classes = useStyles();
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
              <Divider />
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
      </Box>

    )

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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>}
      <Box
        component="main"
        sx={{ 
             flexGrow: 1,
             p: 3,
             width: { sm: `calc(100% - ${drawerWidth}px)` },
             maxWidth:'900px',
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