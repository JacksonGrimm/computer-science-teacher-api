class CacheData {
  private cache = {};

  /**
   * stash value into cache
   * @param key
   * @param value
   */
  put(key: string, value: string): boolean {
    (this.cache as any)[key] = value;
    return true;
  }
  /**
   * get value from cache. this operation does not remove the value from the cache, it only retrieves it.
   * @param key
   * @returns
   */
  get(key: string): string | undefined {
    return (this.cache as any)[key];
  }
  /**
   * Clears the cache entirely
   * @returns
   */
  clear(): void {
    this.cache = {};
  }
}

export default CacheData;
