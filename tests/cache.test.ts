import CacheData from "../utils/cache.util";

var cacheData = new CacheData();

test("tests putting data in cache", () => {
  expect(cacheData.put("key", "data").get("key")).toBe("data");
});

test("tests getting data in cache", () => {
  expect(cacheData.get("key")).toBe("data");
});

test("tests overwrite data", () => {
  cacheData.put("key", "null");
  cacheData.put("key", "data");

  expect(cacheData.get("key")).toBe("data");
});

test("clear data in cache", () => {
  expect(cacheData.clear().get("key")).toBe(undefined);
});
