// API Configuration
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8000' 
  : 'https://your-production-api.com';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    PSEUDONYMOUS: `${API_BASE_URL}/api/auth/pseudonymous`,
  },
};

// Helper function for making API requests
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
