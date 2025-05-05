import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import LoanCalculator from './Components/LoanCalculator';
import ErrorPage from './Components/ErrorPage';
import NavBar from './Components/Navbar';

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<LoanCalculator/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
