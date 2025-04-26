# WashupPro App

A car washing service booking application.

## Weather Feature

The app now includes a real-time weather system for the Rangsit, Bangkok area on the booking page. This feature:

- Displays current weather conditions
- Shows a 7-day forecast
- Updates every 5 minutes
- Includes animated backgrounds that change based on weather conditions
- Uses Framer Motion for smooth animations

### Setup Weather API

To use the weather feature, you need to obtain an API key from OpenWeatherMap:

1. Create an account at [OpenWeatherMap](https://openweathermap.org/)
2. Generate an API key in your account dashboard
3. Create a `.env` file in the root of your project and add:
   ```
   VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   ```

### Weather API Configuration

The weather service is configured for Rangsit, Bangkok by default. If you want to change the location, update the latitude and longitude values in `src/services/weatherService.ts`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally