import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme as useMUITheme } from '@mui/material/styles';
import { useTheme } from '../Context/ThemeContext';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme(); // your custom context
  const muiTheme = useMUITheme(); // MUI's built-in theme for responsive breakpoints
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/exchange-rates">
          <ListItemText primary="Exchange Rates" />
        </ListItemButton>
        <ListItemButton onClick={toggleTheme}>
          <ListItemText primary={theme === 'light' ? 'Dark Mode' : 'Light Mode'} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator App
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/exchange-rates">
                Exchange Rates
              </Button>
              <Button color="inherit" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerItems}
      </Drawer>
    </>
  );
};

export default NavBar;
