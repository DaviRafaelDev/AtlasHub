import React, { useState } from 'react';
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

  const sortedCountries = [...countries].sort((a, b) => {
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

  const paginatedCountries = isPaginated
    ? sortedCountries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedCountries;

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
        {paginatedCountries.map((country) => (
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
      
      {isPaginated && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={() => handlePageChange(0)} disabled={page === 0}>First</Button>
          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
          <Button onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(sortedCountries.length / rowsPerPage) - 1}>Next</Button>
          <Button onClick={() => handlePageChange(Math.ceil(sortedCountries.length / rowsPerPage) - 1)} disabled={page >= Math.ceil(sortedCountries.length / rowsPerPage) - 1}>Last</Button>
        </Box>
      )}
    </div>
  );
}

export default CountryCard;