class CacheData {
  private cache = {};

  put(key: string, value: any): boolean {
    this.cache[key] = value;
    return true;
  }

  get(key: string): any | undefined {
    return this.cache[key];
  }

  clear(): boolean {
    this.cache = {};
    return true;
  }
}

export default CacheData;
