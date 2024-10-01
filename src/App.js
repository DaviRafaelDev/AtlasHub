import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import CountryDetailsPage from './pages/CountryDetailsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [isPaginated, setIsPaginated] = useState(() => {
    const saved = localStorage.getItem('isPaginated');
    return saved === 'true';
  });
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('viewMode');
    return saved || 'list';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('isPaginated', isPaginated);
    localStorage.setItem('viewMode', viewMode);
  }, [darkMode, isPaginated, viewMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#001B2E' : '#f5f5f5',
        paper: darkMode ? '#003049' : '#ffffff',
      },
      primary: {
        main: darkMode ? '#4A6FA5' : '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="container-fluid">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  darkMode={darkMode} 
                  setDarkMode={setDarkMode}
                  isPaginated={isPaginated}
                  setIsPaginated={setIsPaginated}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
              } 
            />
            <Route path="/country/:countryCode" element={<CountryDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;