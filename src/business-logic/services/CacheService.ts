/**
 * Represents a cache service that provides methods for storing, retrieving, and removing values from cache.
 */
class CacheService {
  private static instance: CacheService | null = null;

  private constructor() {}

  /**
   * Returns the singleton instance of the CacheService class.
   * @returns The singleton instance of the CacheService class.
   */
  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  /**
   * Stores a value in the cache.
   * @param key - The key under which the value will be stored.
   * @param value - The value to be stored.
   */
  storeValue<T>(
    key: string,
    value: T,
    storageType: "local" | "session" = "session"
  ) {
    try {
      if (storageType === "local") {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log("Error when trying to cache data for key:", key, error);
    }
  }

  /**
   * Retrieves a value from the cache.
   * @param key - The key of the value to be retrieved.
   * @returns A promise that resolves to the retrieved value, or null if the value is not found.
   */
  retrieveValue<T>(
    key: string,
    storageType: "local" | "session" = "session"
  ): string | T | null {
    let item: T | string | null = null;
    try {
      let storedItem: string | null = null;
      if (storageType === "local") {
        storedItem = localStorage.getItem(key);
      } else {
        storedItem = sessionStorage.getItem(key);
      }
      if (storedItem) {
        item = JSON.parse(storedItem);
      }
    } catch (error) {
      throw new Error(`Error retrieving value from cache : ${error}`);
    }
    return item;
  }

  /**
   * Removes a value from the cache.
   * @param key - The key of the value to be removed.
   */
  removeValueAt(key: string, storageType: "local" | "session" = "session") {
    try {
      if (storageType === "local") {
        localStorage.removeItem(key);
      } else {
        sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.log("Error removing cached value at:", key, error);
    }
  }

  /**
   * Clears the entire cache.
   */
  async clearStorage() {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.log("Error clearing cache", error);
    }
  }
}

export default CacheService;
