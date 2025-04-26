import { WeatherData } from './weatherService';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheItem {
  data: WeatherData;
  timestamp: number;
}

// Simple in-memory cache
class WeatherCache {
  private cache: CacheItem | null = null;

  // Get data from cache if still valid
  getData(): WeatherData | null {
    if (!this.cache) {
      return null;
    }

    const now = Date.now();
    const cacheAge = now - this.cache.timestamp;

    // Return cached data if still fresh
    if (cacheAge < CACHE_DURATION) {
      return this.cache.data;
    }

    // Cache expired
    return null;
  }

  // Store new data in cache
  setData(data: WeatherData): void {
    this.cache = {
      data,
      timestamp: Date.now(),
    };
  }

  // Check if cache is stale and needs refresh
  needsRefresh(): boolean {
    if (!this.cache) {
      return true;
    }

    const now = Date.now();
    const cacheAge = now - this.cache.timestamp;
    
    return cacheAge >= CACHE_DURATION;
  }

  // Get timestamp of last update
  getLastUpdated(): Date {
    return this.cache ? new Date(this.cache.timestamp) : new Date();
  }
}

// Export a singleton instance
export const weatherCache = new WeatherCache(); 