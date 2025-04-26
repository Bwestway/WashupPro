import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData, WeatherData } from '../services/weatherService';

// Store as a module-level variable to share the data and lastUpdated between hook instances
let globalWeatherData: WeatherData | null = null;
let globalLastUpdated: Date = new Date();
let subscribers: (() => void)[] = [];

/**
 * Hook that provides weather data and functionality to refresh it
 */
const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(globalWeatherData);
  const [lastUpdated, setLastUpdated] = useState<Date>(globalLastUpdated);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch weather data and update global state
  const fetchWeather = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchWeatherData();
      globalWeatherData = data;
      globalLastUpdated = new Date();
      
      // Update all subscribers
      setWeatherData(data);
      setLastUpdated(globalLastUpdated);
      subscribers.forEach(callback => callback());
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Function for consumers to manually refresh weather
  const refresh = useCallback(() => {
    if (!isRefreshing) {
      fetchWeather();
    }
  }, [fetchWeather, isRefreshing]);

  // Subscribe to global updates
  useEffect(() => {
    // Initial fetch if data doesn't exist
    if (!globalWeatherData) {
      fetchWeather();
    } else {
      // Use existing data
      setWeatherData(globalWeatherData);
      setLastUpdated(globalLastUpdated);
    }

    // Subscribe to updates
    const callback = () => {
      setWeatherData(globalWeatherData);
      setLastUpdated(globalLastUpdated);
    };
    subscribers.push(callback);

    // Unsubscribe on cleanup
    return () => {
      subscribers = subscribers.filter(cb => cb !== callback);
    };
  }, [fetchWeather]);

  return {
    weatherData,
    lastUpdated,
    isRefreshing,
    refresh
  };
};

export default useWeather; 