import path from "path";
import { promises as fsAsync } from "graceful-fs";
import TypeMapper from "./transformers/TypeMapper";

class ModuleFactory{
  moduleId = 0;
  /**
   * @param {string} filename Name of the file to produce Module type
   * @returns {Promise<import("./types/types").Module>}
   * @memberof ModuleFactory
   */
  async createModule(filename){
    this.moduleId += 1;

    const source = await fsAsync.readFile(filename, { encoding: "utf8" });
    const type = path.extname(filename);
    
    return {
      ...TypeMapper[type].transform(source),
      filename,
      moduleId: this.moduleId,
    };
  }

}

export default ModuleFactory;
