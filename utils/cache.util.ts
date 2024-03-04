class CacheData {
  private cache = {};

  /**
   * stash value into cache
   * @param key
   * @param value
   */
  put(key: string, value: string): this {
    (this.cache as any)[key] = value;
    return this;
  }
  /**
   * get value from cache. this operation does not remove the value from the cache, it only retrieves it.
   * @param key
   */
  get(key: string): string | undefined {
    return (this.cache as any)[key];
  }
  /**
   * Clears the cache entirely
   */
  clear(): this {
    this.cache = {};
    return this;
  }
}

export default CacheData;
