import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

function Sidebar({ 
  regionFilter, 
  setRegionFilter, 
  subRegionFilter, 
  setSubRegionFilter,
  populationFilter,
  setPopulationFilter,
  countries 
}) {
  const regions = [...new Set(countries.map(country => country.region))];
  const subRegions = [...new Set(countries.map(country => country.subregion).filter(Boolean))];

  return (
    <Box sx={{ padding: 2 }}>
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Region</InputLabel>
        <Select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          label="Region"
        >
          <MenuItem value="">All Regions</MenuItem>
          {regions.map(region => (
            <MenuItem key={region} value={region}>{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Sub-region</InputLabel>
        <Select
          value={subRegionFilter}
          onChange={(e) => setSubRegionFilter(e.target.value)}
          label="Sub-region"
        >
          <MenuItem value="">All Sub-regions</MenuItem>
          {subRegions.map(subregion => (
            <MenuItem key={subregion} value={subregion}>{subregion}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Population</InputLabel>
        <Select
          value={populationFilter}
          onChange={(e) => setPopulationFilter(e.target.value)}
          label="Population"
        >
          <MenuItem value="">All Populations</MenuItem>
          <MenuItem value="<1M">Less than 1M</MenuItem>
          <MenuItem value="1M-10M">1M - 10M</MenuItem>
          <MenuItem value="10M-100M">10M - 100M</MenuItem>
          <MenuItem value=">100M">More than 100M</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sidebar;