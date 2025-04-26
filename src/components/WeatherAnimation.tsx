import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface WeatherAnimationProps {
  condition: string;
  size?: number;
  className?: string;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ 
  condition, 
  size = 100, 
  className = '' 
}) => {
  const getAnimationUrl = (weatherCondition: string) => {
    // Map weather conditions to animation URLs
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'https://assets6.lottiefiles.com/packages/lf20_xlky4kvh.json'; // Sunny animation
      case 'clouds':
      case 'cloudy':
      case 'partly cloudy':
        return 'https://assets8.lottiefiles.com/packages/lf20_trr3kzyu.json'; // Cloudy animation
      case 'rain':
      case 'drizzle':
        return 'https://assets8.lottiefiles.com/packages/lf20_bvarshnc.json'; // Rain animation
      case 'thunderstorm':
        return 'https://assets9.lottiefiles.com/packages/lf20_kuya1c1w.json'; // Thunderstorm animation
      case 'snow':
        return 'https://assets3.lottiefiles.com/packages/lf20_zcnswbma.json'; // Snow animation
      case 'mist':
      case 'fog':
      case 'haze':
        return 'https://assets8.lottiefiles.com/packages/lf20_xr8kcimu.json'; // Fog/Mist animation
      default:
        return 'https://assets6.lottiefiles.com/packages/lf20_xlky4kvh.json'; // Default to sunny
    }
  };

  return (
    <div className={`weather-animation ${className}`} style={{ width: size, height: size }}>
      <Player
        autoplay
        loop
        src={getAnimationUrl(condition)}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default WeatherAnimation; 