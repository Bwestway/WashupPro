import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import useWeather from '../hooks/useWeather';
import WeatherAnimation from './WeatherAnimation';

interface WeatherRecommendationProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

const WeatherRecommendation: React.FC<WeatherRecommendationProps> = ({ 
  selectedDate, 
  onDateChange,
  className = '' 
}) => {
  const { weatherData, loading, error } = useWeather();

  if (loading || error || !weatherData) {
    return null;
  }

  // Find the best day for a car wash in the next 7 days
  const findBestCarWashDay = () => {
    if (!weatherData || !weatherData.daily || !Array.isArray(weatherData.daily) || weatherData.daily.length === 0) {
      return null;
    }
    
    const nextSevenDays = weatherData.daily.slice(0, 7);
    
    // Ensure all days have required properties
    const validDays = nextSevenDays.filter(day => 
      day && day.dt && day.weather && Array.isArray(day.weather) && day.weather.length > 0 && 
      day.temp && typeof day.temp.min === 'number' && typeof day.temp.max === 'number'
    );
    
    if (validDays.length === 0) return null;
    
    // Sort days by weather conditions (clear is best, rain is worst)
    const sortedDays = [...validDays].sort((a, b) => {
      const scoreA = getWeatherScore(a.weather[0].main, a.pop || 0);
      const scoreB = getWeatherScore(b.weather[0].main, b.pop || 0);
      return scoreB - scoreA; // Higher score is better
    });
    
    return sortedDays[0]; // Return the best day
  };

  // Score weather conditions for car washing (0-10)
  const getWeatherScore = (condition: string, rainProbability: number): number => {
    let score = 10;
    
    // Reduce score based on rain probability
    score -= rainProbability * 10;
    
    // Adjust based on weather condition
    switch (condition.toLowerCase()) {
      case 'clear':
        break; // Already max score
      case 'clouds':
        score -= 1; // Slightly less ideal
        break;
      case 'rain':
      case 'drizzle':
        score -= 7; // Bad for car wash
        break;
      case 'thunderstorm':
        score -= 9; // Very bad
        break;
      case 'snow':
        score -= 8;
        break;
      case 'mist':
      case 'fog':
      case 'haze':
        score -= 3; // Not ideal due to drying issues
        break;
      default:
        score -= 2;
    }
    
    return Math.max(0, score); // Don't go below 0
  };

  // Get the forecast for the selected date
  const getSelectedDateForecast = () => {
    if (!selectedDate || !weatherData || !weatherData.daily) return null;
    
    try {
      // Create a new Date object to avoid mutating the original selectedDate
      const selectedDateCopy = new Date(selectedDate);
      const selectedDateTimestamp = selectedDateCopy.setHours(0, 0, 0, 0);
      
      return weatherData.daily.find(day => {
        if (!day || !day.dt) return false;
        
        const dayDate = new Date(day.dt * 1000);
        return dayDate.setHours(0, 0, 0, 0) === selectedDateTimestamp;
      });
    } catch (error) {
      console.error('Error finding selected date forecast:', error);
      return null;
    }
  };

  const selectedDateForecast = getSelectedDateForecast();
  const bestDay = findBestCarWashDay();

  // If no best day or selected date forecast is available, don't show anything
  if (!bestDay || !selectedDateForecast) {
    return null;
  }

  const bestDayDate = new Date(bestDay.dt * 1000);
  
  // Check if selected date is the same as the best day
  const isSelectedBestDay = (() => {
    try {
      const selectedDateCopy = new Date(selectedDate);
      const bestDayDateCopy = new Date(bestDayDate);
      return selectedDateCopy.setHours(0, 0, 0, 0) === bestDayDateCopy.setHours(0, 0, 0, 0);
    } catch (error) {
      console.error('Error comparing dates:', error);
      return false;
    }
  })();

  // Don't show anything if selected date is already the best day
  if (isSelectedBestDay) {
    return null;
  }

  const getWarningLevel = () => {
    if (!selectedDateForecast) return 'info';
    
    const score = getWeatherScore(selectedDateForecast.weather[0].main, selectedDateForecast.pop);
    if (score < 3) return 'high';
    if (score < 7) return 'medium';
    return 'low';
  };

  const warningLevel = getWarningLevel();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg overflow-hidden mb-4 ${className}`}
    >
      {selectedDateForecast && warningLevel !== 'low' && (
        <div className={`p-3 rounded-lg border ${
          warningLevel === 'high' 
            ? 'bg-red-50 border-red-200 text-red-800' 
            : 'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`}>
          <div className="flex items-start">
            <AlertTriangle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">
                {warningLevel === 'high' 
                  ? 'Weather alert: Not ideal for car washing' 
                  : 'Weather note: Conditions may affect washing quality'}
              </p>
              <p className="text-xs mt-1">
                {selectedDateForecast.weather[0].main === 'Rain' || selectedDateForecast.pop > 0.3 
                  ? `There's a ${Math.round(selectedDateForecast.pop * 100)}% chance of rain on your selected date.` 
                  : `The forecast shows ${selectedDateForecast.weather[0].description} for your selected date.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {bestDay && !isSelectedBestDay && (
        <div 
          className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 mt-2 cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => onDateChange(bestDayDate)}
        >
          <div className="flex items-start">
            <div className="mr-2 mt-0.5 flex-shrink-0 w-10 h-10">
              <WeatherAnimation 
                condition={bestDay.weather[0].main} 
                size={40} 
              />
            </div>
            <div>
              <p className="text-sm font-medium">Recommended: Book on {format(bestDayDate, 'EEEE, MMMM d')}</p>
              <p className="text-xs mt-1">
                Better weather conditions ({bestDay.weather[0].description}) for optimal washing results. 
                {bestDay.pop > 0 && ` Only ${Math.round(bestDay.pop * 100)}% chance of rain.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherRecommendation; 