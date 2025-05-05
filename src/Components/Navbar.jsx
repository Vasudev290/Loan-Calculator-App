import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const NavBar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Loan Calculator
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/exchange-rates">Exchange Rates</Button>
                <Button color="inherit" onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} Mode</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
