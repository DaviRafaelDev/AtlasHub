import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  response => {
    if (!response.data) {
      throw new Error('Empty response from API');
    }
    return response;
  },
  error => {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw error;
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
);

export const fetchAllCountries = async () => {
  try {
    const response = await axiosInstance.get('/all');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching countries:', error.message || error);
    return [];
  }
};

export const fetchCountryDetails = async (countryCode) => {
  if (!countryCode || typeof countryCode !== 'string') {
    console.error('Invalid country code provided:', countryCode);
    return null;
  }

  try {
    const response = await axiosInstance.get(`/alpha/${countryCode}`);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      console.error('Country not found for the provided code:', countryCode);
      return null;
    }
  } catch (error) {
    console.error('Error fetching country details:', error.message);
    return null;
  }
};
