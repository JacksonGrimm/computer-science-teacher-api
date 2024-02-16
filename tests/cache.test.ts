import CacheData from "../utils/cache";

var cacheData = new CacheData();

test("tests putting data in cache", () => {
  expect(cacheData.put("key", "data")).toBe(true);
});

test("tests getting data in cache", () => {
  expect(cacheData.get("key")).toBe("data");
});

test("clear data in cache", () => {
  expect(cacheData.clear()).toBe(true);
  expect(cacheData.get("key")).toBe(undefined);
});
