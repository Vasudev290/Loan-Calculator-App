import React from 'react';
import { Typography, Paper } from '@mui/material';

const ErrorPage = () => {
    return (
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h4">404 - Page Not Found</Typography>
            <Typography variant="body1">Sorry, the page you're looking for doesn't exist.</Typography>
        </Paper>
    );
};

export default ErrorPage;
