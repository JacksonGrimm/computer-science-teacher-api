import { writeFile, readFile } from "node:fs/promises";

export class AccessJsonStore {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async writeFile(fileName: string, data) {
    try {
      const writeResponse = await writeFile(
        `${this.path}${fileName}`,
        JSON.stringify(data)
      );
      return { data: writeResponse, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  }

  async pushToJsonData(fileName: string, data: string | string[]) {
    try {
      const { data: fileData } = await this.accessJsonData(fileName);
      if (!Array.isArray(fileData)) {
        throw new Error("file data is not type of Array");
      }

      if (Array.isArray(data)) {
        data.forEach((element) => fileData.push(element));
      } else {
        fileData.push(data);
      }

      return await this.writeFile(fileName, fileData);
    } catch (error) {
      return { data: null, error };
    }
  }

  async accessJsonData(fileName: string) {
    try {
      const fileData = await readFile(`${this.path}${fileName}`, {
        encoding: "utf8",
      });
      return { data: JSON.parse(fileData), error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error };
    }
  }

  async popData(fileName: string) {
    try {
      const { data: fileData } = await this.accessJsonData(fileName);

      if (!Array.isArray(fileData)) {
        throw new Error("file data is not type of Array");
      }

      const extractedData = fileData.pop();

      await this.writeFile(fileName, fileData);

      return { data: extractedData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

export const lessonStore = new AccessJsonStore("./json_data/");
