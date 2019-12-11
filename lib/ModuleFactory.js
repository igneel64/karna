import path from "path";
import { promises as fsAsync } from "graceful-fs";
import TypeMapper from "./transformers/TypeMapper";

class ModuleFactory{
  moduleId = 0;
  nameCache = { }
  /**
   * @param {string} filename Name of the file to produce Module type
   * @returns {Promise<import("./types/types").Module>}
   * @memberof ModuleFactory
   */
  async createModule(filename){
    if(this.nameCache[filename]){
      return "";
    }
    this.nameCache[filename] = true;
    this.moduleId += 1;

    const source = await fsAsync.readFile(filename, { encoding: "utf8" });
    const type = path.extname(filename);
    
    return {
      ...await TypeMapper[type].transform(source, filename),
      filename,
      moduleId: this.moduleId,
    };
  }

}

export default ModuleFactory;
