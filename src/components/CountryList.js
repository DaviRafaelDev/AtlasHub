import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.mode === 'dark' ? '#002b42' : theme.palette.grey[100],
    fontWeight: 'bold',
  },
}));

function CountryList({ countries, isPaginated }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(16);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCountries = countries.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common);
    } else if (orderBy === 'population') {
      return order === 'asc' ? a.population - b.population : b.population - a.population;
    } else if (orderBy === 'area') {
      return order === 'asc' ? a.area - b.area : b.area - a.area;
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
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '60px' }}></StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'population'}
                  direction={orderBy === 'population' ? order : 'asc'}
                  onClick={() => handleRequestSort('population')}
                >
                  Population
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'area'}
                  direction={orderBy === 'area' ? order : 'asc'}
                  onClick={() => handleRequestSort('area')}
                >
                  Area
                </TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCountries.map((country) => (
              <TableRow key={country.cca3} component={Link} to={`/country/${country.cca3}`} style={{ textDecoration: 'none' }}>
                <TableCell><img src={country.flags.svg} alt={`${country.name.common} flag`} width="40" /></TableCell>
                <TableCell>{country.name.common}</TableCell>
                <TableCell>{country.population.toLocaleString()}</TableCell>
                <TableCell>{country.area.toLocaleString()} km²</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPaginated && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={() => handlePageChange(0)} disabled={page === 0}>First</Button>
          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
          <Button onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(sortedCountries.length / rowsPerPage) - 1}>Next</Button>
          <Button onClick={() => handlePageChange(Math.ceil(sortedCountries.length / rowsPerPage) - 1)} disabled={page >= Math.ceil(sortedCountries.length / rowsPerPage) - 1}>Last</Button>
        </Box>
      )}
    </Box>
  );
}

export default CountryList;