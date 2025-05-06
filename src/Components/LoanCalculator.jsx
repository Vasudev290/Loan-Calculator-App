import React, { useState } from "react";
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
  Paper,
  Grid,
} from "@mui/material";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

  const calculateEMI = () => {
    const principle = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / (12 * 100);
    const months = parseInt(term) * 12;

    const emiValue =
      (principle * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);

    setEmi(emiValue.toFixed(2));
    setIsCalculated(true);

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
    setLoanAmount("");
    setInterestRate("");
    setTerm("");
    setEmi(0);
    setSchedule([]);
    setIsCalculated(false);
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Term (Years)"
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={2}>
        <Button variant="contained" onClick={calculateEMI}>
          CALCULATE
        </Button>
      </Box>

      {/* Display EMI */}
      {isCalculated && (
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Monthly EMI: {currency} {emi}
          </Typography>
        </Box>
      )}

      {/* Amortization Table Section */}
      {schedule.length > 0 && (
        <Box mt={4}>
          {/* Top controls and title */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            {/* Heading */}
            <Typography variant="h6">
              Amortization Schedule ({currency})
            </Typography>

            {/* Currency and Reset */}
            <Box display="flex" gap={2}>
              <Select
                size="small"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </Select>

              <Button
                size="small"
                variant="outlined"
                onClick={resetInputs}
              >
                RESET TABLE
              </Button>
            </Box>
          </Box>

          {/* Amortization Table */}
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
                    <TableCell>
                      {currency} {row.principal}
                    </TableCell>
                    <TableCell>
                      {currency} {row.interest}
                    </TableCell>
                    <TableCell>
                      {currency} {row.remainingBalance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default LoanCalculator;
