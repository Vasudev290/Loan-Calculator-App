import { useState } from 'react';

const useEmiCalculator = (principal, rate, term) => {
    const [emi, setEmi] = useState(0);
    
    const calculateEmi = () => {
        const R = rate / (12 * 100); 
        const N = term * 12; 
        const emiValue = (principal * R * Math.pow((1 + R), N)) / (Math.pow((1 + R), N) - 1);
        setEmi(emiValue.toFixed(2));
    };

    return { emi, calculateEmi };
};

export default useEmiCalculator;
