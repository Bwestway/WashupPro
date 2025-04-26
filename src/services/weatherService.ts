import axios from 'axios';
import { weatherCache } from './weatherCache';

// Reliable weather API configuration
// We're using Open-Meteo which provides accurate weather data similar to Google Weather
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Rangsit, Bangkok coordinates
const LATITUDE = 13.9967;
const LONGITUDE = 100.6167;

// Weather data interfaces
interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface DailyTemperature {
  min: number;
  max: number;
}

interface DailyForecast {
  dt: number;
  temp: DailyTemperature;
  weather: WeatherItem[];
  pop: number;  // Probability of precipitation
}

export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    weather: WeatherItem[];
  };
  daily: DailyForecast[];
}

// Convert Kelvin to Celsius - utility function exported so it can be used elsewhere
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

// Map weather code to condition
const mapWeatherCode = (code: number): { main: string; description: string; icon: string; id: number } => {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  
  if (code === 0) {
    return { main: 'Clear', description: 'clear sky', icon: '01d', id: 800 };
  } else if (code <= 3) {
    return { main: 'Clouds', description: 'partly cloudy', icon: '02d', id: 801 };
  } else if (code <= 49) {
    return { main: 'Fog', description: 'fog', icon: '50d', id: 741 };
  } else if (code <= 59) {
    return { main: 'Drizzle', description: 'light rain', icon: '09d', id: 300 };
  } else if (code <= 69) {
    return { main: 'Rain', description: 'rain', icon: '10d', id: 500 };
  } else if (code <= 79) {
    return { main: 'Snow', description: 'snow', icon: '13d', id: 600 };
  } else if (code <= 99) {
    return { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d', id: 200 };
  }
  
  return { main: 'Clear', description: 'clear sky', icon: '01d', id: 800 };
};

// Fallback data in case API fails
const getFallbackWeatherData = (): WeatherData => {
  const now = new Date();
  return {
    current: {
      temp: 36,
      feels_like: 38,
      humidity: 60,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ]
    },
    daily: Array.from({ length: 7 }, (_, i) => ({
      dt: Math.floor(now.getTime() / 1000) + (i * 86400),
      temp: {
        min: 27 + Math.floor(Math.random() * 3),
        max: 35 + Math.floor(Math.random() * 4)
      },
      weather: [
        {
          id: 800,
          main: i % 2 === 0 ? 'Clear' : 'Clouds',
          description: i % 2 === 0 ? 'clear sky' : 'scattered clouds',
          icon: i % 2 === 0 ? '01d' : '03d'
        }
      ],
      pop: i % 3 === 0 ? 0.4 : 0
    }))
  };
};

// Fetch weather data for Rangsit, Bangkok
export const fetchWeatherData = async (forceRefresh = false): Promise<WeatherData> => {
  // Check if we have valid cached data
  if (!forceRefresh) {
    const cachedData = weatherCache.getData();
    if (cachedData) {
      return cachedData;
    }
  }
  
  try {
    // Fetch from Open-Meteo API which provides free, reliable weather data (similar to what Google uses)
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        timezone: 'Asia/Bangkok',
        forecast_days: 7
      }
    });

    // Transform data to match our interface
    const data = response.data;
    
    // Create current weather object
    const currentWeatherCode = data.current.weather_code;
    const currentWeather = mapWeatherCode(currentWeatherCode);
    
    const weatherData: WeatherData = {
      current: {
        temp: Math.round(data.current.temperature_2m),
        feels_like: Math.round(data.current.apparent_temperature),
        humidity: Math.round(data.current.relative_humidity_2m),
        weather: [currentWeather]
      },
      daily: data.daily.time.map((time: string, index: number) => {
        const date = new Date(time);
        const weatherCode = data.daily.weather_code[index];
        const weather = mapWeatherCode(weatherCode);
        
        return {
          dt: date.getTime() / 1000,
          temp: {
            max: Math.round(data.daily.temperature_2m_max[index]),
            min: Math.round(data.daily.temperature_2m_min[index])
          },
          weather: [weather],
          pop: data.daily.precipitation_probability_max[index] / 100 // Convert percentage to decimal
        };
      })
    };

    // Cache the data
    weatherCache.setData(weatherData);
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Try to use cached data even if it's expired
    const cachedData = weatherCache.getData();
    if (cachedData) {
      return cachedData;
    }
    
    // If all else fails, return fallback data
    return getFallbackWeatherData();
  }
};

// Get appropriate weather animation based on weather condition
export const getWeatherAnimation = (weatherCondition: string): string => {
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      return 'clear-day';
    case 'clouds':
      return 'cloudy';
    case 'rain':
    case 'drizzle':
      return 'rainy';
    case 'thunderstorm':
      return 'thunder';
    case 'snow':
      return 'snowy';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'mist';
    default:
      return 'clear-day';
  }
}; 