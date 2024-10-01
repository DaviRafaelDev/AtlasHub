import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import CountryList from '../components/CountryList';
import CountryCard from '../components/CountryCard';
import GlobalSettings from '../components/GlobalSettings';
import Sidebar from '../components/Sidebar';
import FilterModal from '../components/FilterModal';
import { fetchAllCountries } from '../utils/api';
import { Box, ToggleButtonGroup, ToggleButton, TextField, Button } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FilterListIcon from '@mui/icons-material/FilterList';

function HomePage({ darkMode, setDarkMode, isPaginated, setIsPaginated, viewMode, setViewMode }) {
  const [countries, setCountries] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [subRegionFilter, setSubRegionFilter] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1036));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down(432));

  useEffect(() => {
    fetchAllCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setViewMode('card');
    }
  }, [isMobile, setViewMode]);

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null && !isMobile) {
      setViewMode(newViewMode);
    }
  };

  const filteredCountries = countries.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const regionMatch = !regionFilter || country.region === regionFilter;
    const subRegionMatch = !subRegionFilter || country.subregion === subRegionFilter;
    const populationMatch = !populationFilter || (() => {
      const population = country.population;
      switch(populationFilter) {
        case '<1M': return population < 1000000;
        case '1M-10M': return population >= 1000000 && population < 10000000;
        case '10M-100M': return population >= 10000000 && population < 100000000;
        case '>100M': return population >= 100000000;
        default: return true;
      }
    })();
    return nameMatch && regionMatch && subRegionMatch && populationMatch;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onSettingsClick={() => setSettingsOpen(true)} />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {!isSmallScreen && (
          <Box 
            component="aside"
            sx={{
              width: 250,
              flexShrink: 0,
              overflowY: 'auto',
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            <Sidebar
              regionFilter={regionFilter}
              setRegionFilter={setRegionFilter}
              subRegionFilter={subRegionFilter}
              setSubRegionFilter={setSubRegionFilter}
              populationFilter={populationFilter}
              setPopulationFilter={setPopulationFilter}
              countries={countries}
            />
          </Box>
        )}
        <Box 
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: 'auto',
            height: '100%',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexGrow: 1,
              flexWrap: 'wrap'
            }}>
              <TextField
                label="Search by name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ flexGrow: 1, maxWidth: '600px' }}
              />
              {isSmallScreen && (
                <Button
                  variant="outlined"
                  startIcon={!isSmallerScreen && <FilterListIcon />}
                  onClick={() => setFilterModalOpen(true)}
                  size="small"
                  sx={{
                    minWidth: isSmallerScreen ? '40px' : 'auto',
                    '& .MuiButton-startIcon': {
                      margin: isSmallerScreen ? 0 : undefined,
                    },
                  }}
                >
                  {isSmallerScreen ? <FilterListIcon /> : 'Filters'}
                </Button>
              )}
            </Box>
            {!isMobile && (
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
              >
                <ToggleButton value="list" aria-label="list view">
                  <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="card" aria-label="card view">
                  <ViewModuleIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>
          {viewMode === 'list' && !isMobile ? (
            <CountryList countries={filteredCountries} isPaginated={isPaginated} />
          ) : (
            <CountryCard countries={filteredCountries} isPaginated={isPaginated} />
          )}
        </Box>
      </Box>
      <GlobalSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isPaginated={isPaginated}
        setIsPaginated={setIsPaginated}
      />
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        subRegionFilter={subRegionFilter}
        setSubRegionFilter={setSubRegionFilter}
        populationFilter={populationFilter}
        setPopulationFilter={setPopulationFilter}
        countries={countries}
      />
    </Box>
  );
}

export default HomePage;