import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

interface WeatherBackgroundProps {
  condition: string;
  children: React.ReactNode;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = memo(({ condition = 'clear', children }) => {
  const [prevCondition, setPrevCondition] = useState<string>(condition || 'clear');
  const [transitioning, setTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (condition && condition !== prevCondition) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setPrevCondition(condition);
        setTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [condition, prevCondition]);

  // Animation sources for different weather conditions
  const getAnimationSrc = (weatherCondition: string = 'clear') => {
    switch ((weatherCondition || 'clear').toLowerCase()) {
      case 'clear':
        return 'https://assets3.lottiefiles.com/packages/lf20_qtbjluuz.json'; // Sunny background
      case 'clouds':
        return 'https://assets5.lottiefiles.com/packages/lf20_KUFdS6.json'; // Cloudy background
      case 'rain':
      case 'drizzle':
        return 'https://assets2.lottiefiles.com/packages/lf20_bsdmixmk.json'; // Rain background
      case 'thunderstorm':
        return 'https://assets9.lottiefiles.com/temp/lf20_Kuot2e.json'; // Thunderstorm background
      case 'snow':
        return 'https://assets9.lottiefiles.com/packages/lf20_ddu49jgx.json'; // Snow background
      case 'mist':
      case 'fog':
      case 'haze':
        return 'https://assets5.lottiefiles.com/packages/lf20_yev3jx3h.json'; // Mist background
      default:
        return 'https://assets3.lottiefiles.com/packages/lf20_qtbjluuz.json'; // Default sunny
    }
  };

  // Get background gradient based on weather condition
  const getBackgroundGradient = (weatherCondition: string = 'clear') => {
    switch ((weatherCondition || 'clear').toLowerCase()) {
      case 'clear':
        return 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-b from-gray-400 via-blue-600 to-blue-700';
      case 'thunderstorm':
        return 'bg-gradient-to-b from-gray-600 via-purple-800 to-purple-900';
      case 'snow':
        return 'bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300';
      case 'mist':
      case 'fog':
      case 'haze':
        return 'bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400';
      default:
        return 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const currentCondition = transitioning ? prevCondition : condition;
  const backgroundClass = getBackgroundGradient(currentCondition);

  return (
    <div className={`relative min-h-screen ${backgroundClass} transition-colors duration-1000`}>
      {/* Weather animation background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCondition}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
          style={{ opacity: 0.6 }} // Make animation slightly transparent
        >
          <Player
            autoplay
            loop
            src={getAnimationSrc(currentCondition)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

export default WeatherBackground; 