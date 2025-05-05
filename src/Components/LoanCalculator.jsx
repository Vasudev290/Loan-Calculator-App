import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false); // New state variable

  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'AUD', 'CAD'];

  const calculateEMI = () => {
    const principle = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / (12 * 100); // Monthly interest
    const months = parseInt(term) * 12;

    const emiValue = (principle * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    setEmi(emiValue.toFixed(2));
    setIsCalculated(true); // Set to true after calculation

    // Generate Amortization Schedule
    let newSchedule = [];
    let remainingBalance = principle;

    for (let i = 1; i <= months; i++) {
      const interest = remainingBalance * rate;
      const principal = emiValue - interest;
      remainingBalance -= principal;

      newSchedule.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
      });
    }
    setSchedule(newSchedule);
  };

  const resetInputs = () => {
    setLoanAmount('');
    setInterestRate('');
    setTerm('');
    setEmi(0);
    setSchedule([]);
    setIsCalculated(false); // Reset the calculation state
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
  <TextField
    label="Loan Amount"
    variant="outlined"
    type="number"
    value={loanAmount}
    onChange={(e) => setLoanAmount(e.target.value)}
    sx={{ marginRight: 2 }}
  />
  <TextField
    label="Interest Rate (%)"
    variant="outlined"
    type="number"
    value={interestRate}
    onChange={(e) => setInterestRate(e.target.value)}
    sx={{ marginRight: 2 }}
  />
  <TextField
    label="Term (Years)"
    variant="outlined"
    type="number"
    value={term}
    onChange={(e) => setTerm(e.target.value)}
    sx={{ marginRight: 2 }}
  />
  
  <br /><br />
  <Button variant="contained" onClick={calculateEMI}>
    CALCULATE
  </Button>

  {/* Currency Selector Visible only after calculation */}
  {isCalculated && (
    <Box sx={{ marginTop: 2 }}>
      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        sx={{ minWidth: 100, marginRight: 2 }}
      >
        {currencies.map((curr) => (
          <MenuItem key={curr} value={curr}>{curr}</MenuItem>
        ))}
      </Select>
      <Button variant="outlined" onClick={resetInputs}>
        RESET TABLE
      </Button>
    </Box>
  )}
</Box>

      
      {emi > 0 && (
        <Typography variant="h6">
          Monthly EMI: {currency} {emi}
        </Typography>
      )}

      {schedule.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Principal</TableCell>
                <TableCell>Interest</TableCell>
                <TableCell>Remaining Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{currency} {row.principal}</TableCell>
                  <TableCell>{currency} {row.interest}</TableCell>
                  <TableCell>{currency} {row.remainingBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LoanCalculator;
