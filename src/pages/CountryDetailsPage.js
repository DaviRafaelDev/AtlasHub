import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryDetails } from '../utils/api';
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  Language,
  Public,
  LocationCity,
  People,
  AspectRatio,
  Translate,
  AttachMoney,
  Schedule,
  Web,
  Phone,
  ArrowBack,
} from '@mui/icons-material';

const InfoItem = ({ icon, label, value, chipItems }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
    <Box sx={{ mr: 2, mt: 0.5 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      {chipItems ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
          {chipItems.map((item, index) => (
            <Chip key={index} label={item} size="small" />
          ))}
        </Box>
      ) : (
        <Typography variant="body1">{value || 'Not available'}</Typography>
      )}
    </Box>
  </Box>
);

function CountryDetailsPage() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountryDetails(countryCode).then(data => {
      setCountry(data);
      setLoading(false);
    });
  }, [countryCode]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!country) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Country not found.</Typography>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowBack />} 
          sx={{ mt: 2 }}
        >
          Back to Countries
        </Button>
      </Box>
    );
  }

  const getLanguages = () => {
    return country.languages ? Object.values(country.languages) : [];
  };

  const getCurrencies = () => {
    return country.currencies
      ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`)
      : [];
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Button 
        component={Link} 
        to="/"
        startIcon={<ArrowBack />} 
        sx={{ mb: 2 }}
      >
        Back to Countries
      </Button>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common}'s flag`}
                  style={{
                    width: '100%',
                    maxWidth: 300,
                    height: 'auto',
                    borderRadius: 4,
                    marginBottom: 16,
                  }}
                />
                <Typography variant="h4" gutterBottom>
                  {country.name.common}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {country.name.official}
                </Typography>
                {country.coatOfArms.svg && (
                  <img
                    src={country.coatOfArms.svg}
                    alt={`${country.name.common}'s coat of arms`}
                    style={{
                      width: '100%',
                      maxWidth: 100,
                      height: 'auto',
                      marginTop: 16,
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Country Information</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    icon={<LocationCity />}
                    label="Capital"
                    value={country.capital ? country.capital.join(', ') : 'N/A'}
                  />
                  <InfoItem
                    icon={<Public />}
                    label="Region"
                    value={`${country.region}${country.subregion ? ` (${country.subregion})` : ''}`}
                  />
                  <InfoItem
                    icon={<People />}
                    label="Population"
                    value={country.population.toLocaleString()}
                  />
                  <InfoItem
                    icon={<AspectRatio />}
                    label="Area"
                    value={`${country.area.toLocaleString()} km²`}
                  />
                  <InfoItem
                    icon={<Translate />}
                    label="Languages"
                    chipItems={getLanguages()}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <InfoItem
                    icon={<AttachMoney />}
                    label="Currencies"
                    chipItems={getCurrencies()}
                  />
                  <InfoItem
                    icon={<Schedule />}
                    label="Timezones"
                    chipItems={country.timezones}
                  />
                  <InfoItem
                    icon={<Web />}
                    label="Internet TLD"
                    chipItems={country.tld}
                  />
                  <InfoItem
                    icon={<Phone />}
                    label="Calling Code"
                    value={country.idd.root + (country.idd.suffixes?.[0] || '')}
                  />
                  <InfoItem
                    icon={<Language />}
                    label="Demonyms"
                    value={country.demonyms?.eng?.m}
                  />
                </Grid>
              </Grid>
              
              {country.maps?.googleMaps && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CountryDetailsPage;