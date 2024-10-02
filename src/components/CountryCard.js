import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Grid, 
  Box,
  Select,
  MenuItem
} from '@mui/material';

function CountryCard({ countries, isPaginated }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const loader = useRef(null);

  const sortCountries = useCallback((countriesToSort) => {
    return [...countriesToSort].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.common.localeCompare(b.name.common) 
          : b.name.common.localeCompare(a.name.common);
      } else if (sortBy === 'population') {
        return sortOrder === 'asc' 
          ? a.population - b.population 
          : b.population - a.population;
      } else if (sortBy === 'area') {
        return sortOrder === 'asc' 
          ? a.area - b.area 
          : b.area - a.area;
      }
      return 0;
    });
  }, [sortBy, sortOrder]);

  // Reset page and displayed countries when switching between paginated and infinite scroll
  useEffect(() => {
    setPage(0);
    const sortedCountries = sortCountries(countries);
    if (isPaginated) {
      setDisplayedCountries(sortedCountries.slice(0, rowsPerPage));
    } else {
      setDisplayedCountries(sortedCountries.slice(0, 24)); // Initial load for infinite scroll
    }
  }, [countries, isPaginated, rowsPerPage, sortCountries]);

  useEffect(() => {
    setPage(0);
    const sortedCountries = sortCountries(countries);
    if (isPaginated) {
      setDisplayedCountries(sortedCountries.slice(0, rowsPerPage));
    } else {
      setDisplayedCountries(sortedCountries.slice(0, 24));
    }
  }, [sortBy, sortOrder]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isPaginated) {
      setPage((prev) => prev + 1);
    }
  }, [isPaginated]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    }
  }, [handleObserver]);

  useEffect(() => {
    if (!isPaginated && page > 0) {
      const sortedCountries = sortCountries(countries);
      const nextCountries = sortedCountries.slice(
        displayedCountries.length,
        displayedCountries.length + 12
      );
      setDisplayedCountries(prev => [...prev, ...nextCountries]);
    }
  }, [page, isPaginated]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const sortedCountries = sortCountries(countries);
    setDisplayedCountries(sortedCountries.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
  };

  return (
    <div>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        flexWrap: 'wrap'
      }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="population">Sort by Population</MenuItem>
          <MenuItem value="area">Sort by Area</MenuItem>
        </Select>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          size="small"
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </Box>
      
      <Grid container spacing={3}>
        {displayedCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <Card 
              component={Link} 
              to={`/country/${country.cca3}`} 
              sx={{ 
                textDecoration: 'none', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  paddingTop: '56.25%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${country.flags.svg})`,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {country.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Population: {country.population.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Area: {country.area.toLocaleString()} km²
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {isPaginated ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={() => handlePageChange(0)} disabled={page === 0}>First</Button>
          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
          <Button onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(countries.length / rowsPerPage) - 1}>Next</Button>
          <Button onClick={() => handlePageChange(Math.ceil(countries.length / rowsPerPage) - 1)} disabled={page >= Math.ceil(countries.length / rowsPerPage) - 1}>Last</Button>
        </Box>
      ) : (
        <div ref={loader} style={{ height: '20px', margin: '20px 0' }} />
      )}
    </div>
  );
}

export default CountryCard;