import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import useWeather from '../hooks/useWeather';

interface WeatherStatusProps {
  className?: string;
}

const WeatherStatus: React.FC<WeatherStatusProps> = ({ className = '' }) => {
  const { lastUpdated, refresh, isRefreshing } = useWeather();
  
  const formatUpdateTime = () => {
    try {
      // Show relative time if less than 1 hour ago
      const timeAgo = formatDistanceToNow(lastUpdated, { addSuffix: true });
      
      // Also show exact time
      const exactTime = format(lastUpdated, 'h:mm a');
      
      return `${timeAgo} (${exactTime})`;
    } catch (error) {
      return 'just now';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center text-xs text-white/80 ${className}`}
    >
      <span className="mr-2">Weather updated {formatUpdateTime()}</span>
      <button
        onClick={() => refresh()}
        disabled={isRefreshing}
        className="p-1 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
        title="Refresh weather data"
      >
        <RefreshCw 
          size={14} 
          className={`${isRefreshing ? 'animate-spin' : ''}`} 
        />
      </button>
    </motion.div>
  );
};

export default WeatherStatus; 