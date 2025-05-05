import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Paper, Grid } from '@mui/material';
import useEmiCalculator from '../Hooks/useEmiCalculator';
import useCurrencyExchange from '../Hooks/useCurrencyExchange';

const LoanCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState('');
    const [currency, setCurrency] = useState('USD');
    const { emi, calculateEmi } = useEmiCalculator(principal, rate, term);
    const { rates } = useCurrencyExchange(currency);

    const handleCalculate = () => {
        calculateEmi();
    };

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h4">Loan Calculator Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Loan Amount"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Interest Rate (%)"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Term (Years)"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        select
                        label="Currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        {Object.keys(rates).map((curr) => (
                            <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" onClick={handleCalculate}>
                        Calculate
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Monthly EMI: {emi} {currency}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default LoanCalculator;
