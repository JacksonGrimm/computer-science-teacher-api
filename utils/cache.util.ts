class CacheData {
  private cache = {};

  put(key: string, value: string): boolean {
    (this.cache as any)[key] = value;
    return true;
  }

  get(key: string): string | undefined {
    return (this.cache as any)[key];
  }

  clear(): boolean {
    this.cache = {};
    return true;
  }
}

export default CacheData;
