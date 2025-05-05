import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrencyExchange = (baseCurrency) => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/62d4d83d0bcb9d3e4f6b88c8/latest/${baseCurrency}`);
                setRates(response.data.rates);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, [baseCurrency]);

    return { rates, loading };
};

export default useCurrencyExchange;
