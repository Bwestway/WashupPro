/**
 * Converts temperature from Kelvin to Celsius
 * @param kelvin - Temperature in Kelvin
 * @returns Temperature in Celsius, rounded to nearest integer
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Formats percentage chance of rain text
 * @param pop - Probability of precipitation (0-1)
 * @returns Formatted string, e.g. "40%" or "None"
 */
export const formatRainChance = (pop: number): string => {
  const percentage = Math.round(pop * 100);
  return percentage > 0 ? `${percentage}%` : 'None';
}; 