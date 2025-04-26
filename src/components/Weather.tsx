import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, Thermometer, Droplets, Wind, RefreshCcw } from 'lucide-react';
import useWeather from '../hooks/useWeather';
import { formatRainChance } from '../utils/weatherUtils';
import WeatherAnimation from './WeatherAnimation';

interface WeatherProps {
  className?: string;
}

const Weather: React.FC<WeatherProps> = ({ className = '' }) => {
  const { weatherData, loading, error, lastUpdated, refresh, isRefreshing } = useWeather();

  const getWeatherIcon = (condition: string, size: number = 6) => {
    const sizeClass = `w-${size} h-${size}`;
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className={`${sizeClass} text-yellow-400`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
      case 'clouds':
        return <Cloud className={`${sizeClass} text-gray-400`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className={`${sizeClass} text-blue-400`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
      case 'thunderstorm':
        return <CloudLightning className={`${sizeClass} text-purple-400`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
      case 'snow':
        return <CloudSnow className={`${sizeClass} text-blue-200`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog className={`${sizeClass} text-gray-300`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
      default:
        return <Sun className={`${sizeClass} text-yellow-400`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }} />;
    }
  };

  if (loading) {
    return (
      <div className={`rounded-lg shadow-lg p-4 bg-blue-200 animate-pulse ${className}`}>
        <div className="h-36"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    return null;
  }

  const currentWeather = weatherData.current.weather[0];
  const weatherCondition = currentWeather.main || 'Clear';
  const description = currentWeather.description || 'Clear sky';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {/* Main weather display - blue gradient background */}
      <div className="bg-gradient-to-b from-blue-400 to-blue-600 text-white p-5">
        <div className="flex flex-col items-center">
          {/* Temperature and condition */}
          <div className="flex items-center mb-3">
            <span className="text-6xl font-bold">{weatherData.current.temp}°C</span>
            <div className="ml-4 mt-[-10px]">
              <WeatherAnimation condition={weatherCondition} size={80} />
            </div>
          </div>
          
          {/* Weather condition description */}
          <div className="text-xl font-medium capitalize mb-1">
            {description}
          </div>
          
          <div className="text-sm opacity-80">
            Updated {format(lastUpdated, 'h:mm a')}
          </div>
          
          {/* Weather details in a row */}
          <div className="grid grid-cols-3 gap-4 mt-4 w-full">
            <div className="flex flex-col items-center">
              <Thermometer size={16} className="mb-1" />
              <span className="text-sm">Feels:</span>
              <span className="font-bold">{weatherData.current.feels_like}°C</span>
            </div>
            <div className="flex flex-col items-center">
              <Droplets size={16} className="mb-1" />
              <span className="text-sm">Humidity:</span>
              <span className="font-bold">{weatherData.current.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind size={16} className="mb-1" />
              <span className="text-sm">Rain:</span>
              <span className="font-bold">{weatherData.daily && weatherData.daily[0] ? formatRainChance(weatherData.daily[0].pop) : 'None'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-gray-700 font-medium uppercase text-sm">7-Day Forecast</h3>
          <button 
            onClick={refresh} 
            className="text-blue-500 hover:text-blue-700 p-1 rounded-full transition-all"
            disabled={isRefreshing}
          >
            <RefreshCcw size={14} className={`${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {weatherData.daily && weatherData.daily.length > 0 ? (
          <div className="space-y-2">
            {weatherData.daily.map((day, index) => (
              <div 
                key={day.dt} 
                className="flex items-center justify-between py-1"
              >
                {/* Day of week */}
                <div className="w-16 text-gray-700 font-medium">
                  {index === 0 ? 'Today' : 
                   index === 1 ? 'Fri' : 
                   index === 2 ? 'Sat' : 
                   index === 3 ? 'Sun' : 
                   index === 4 ? 'Mon' : 
                   index === 5 ? 'Tue' : 
                   index === 6 ? 'Wed' : 
                   format(new Date(day.dt * 1000), 'EEE')}
                </div>
                
                {/* Weather icon */}
                <div className="flex-shrink-0 w-12 h-12">
                  <WeatherAnimation 
                    condition={day.weather && day.weather[0] ? day.weather[0].main : 'clear'} 
                    size={48} 
                  />
                </div>
                
                {/* Rain chance if exists */}
                {day.pop > 0 && (
                  <div className="flex items-center text-xs text-blue-500">
                    <Droplets size={10} className="mr-1" />
                    <span>{formatRainChance(day.pop)}</span>
                  </div>
                )}
                
                {/* Temperature range */}
                <div className="w-20 text-right">
                  <span className="text-red-500 font-medium">{day.temp.max}°</span>
                  <span className="mx-1 text-gray-300">|</span>
                  <span className="text-blue-500">{day.temp.min}°</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500">Forecast unavailable</div>
        )}
      </div>
    </motion.div>
  );
};

export default Weather; 