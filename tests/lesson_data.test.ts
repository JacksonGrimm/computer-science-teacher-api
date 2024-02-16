import { access, readFile, constants } from "node:fs/promises";
import AccessJsonStore from "../utils/access_json_store.util";

//create file if one is not there
//read file
//write to file
//get first item then return to file

const lessonStore = new AccessJsonStore("./tests/output/");
const name = "lessons.test.data.json";

test("Create file if one is not found", async () => {
  await lessonStore.writeFile(name, []);

  const file = await access(
    `./tests/output/${name}`,
    constants.R_OK || constants.W_OK
  );
  expect(file).toBe(undefined);
});

test("write to file", async () => {
  await lessonStore.pushToJsonData(name, ["test", "data"]);

  const fileData = await readFile(`./tests/output/${name}`, {
    encoding: "utf8",
  });

  expect(fileData).toBe(JSON.stringify(["test", "data"]));
});

test("read file", async () => {
  const { data } = await lessonStore.accessJsonData(name);

  expect(Boolean(data)).toBe(true);
});

test("get item from file then return updated data", async () => {
  await lessonStore.pushToJsonData(name, ["test", "data"]);

  const { data: poppedData } = await lessonStore.popData(name);

  const { data: newData } = await lessonStore.accessJsonData(name);
  expect(poppedData).toBe("data");
  expect(newData[0]).toBe("test");
});
