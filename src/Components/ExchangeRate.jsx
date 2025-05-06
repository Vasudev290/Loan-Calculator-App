import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Mock exchange rates
const exchangeRates = {
  USD: 1,
  INR: 83.2,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 156.3,
  AUD: 1.51,
};

const currencies = Object.keys(exchangeRates);

const ExchangeRateConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleConvert = () => {
    if (!amount || isNaN(amount)) return;

    const rateFrom = exchangeRates[fromCurrency];
    const rateTo = exchangeRates[toCurrency];
    const usdAmount = parseFloat(amount) / rateFrom;
    const finalAmount = usdAmount * rateTo;

    setConvertedAmount(finalAmount.toFixed(2));
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Exchange Rate Converter
      </Typography>

      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mb={2}
      >
        <Select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          fullWidth={isSmallScreen}
        >
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth={isSmallScreen}
        />

        <Typography variant="body1" sx={{ minWidth: 20, textAlign: "center" }}>
          to
        </Typography>

        <Select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          fullWidth={isSmallScreen}
        >
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Box textAlign="center">
        <Button variant="contained" onClick={handleConvert}>
          Convert
        </Button>
      </Box>

      {convertedAmount && (
        <Typography mt={3} variant="h6" textAlign="center">
          Converted Amount: {toCurrency} {convertedAmount}
        </Typography>
      )}
    </Box>
  );
};

export default ExchangeRateConverter;
