import path from "path";
import fs from "graceful-fs";
import TypeMapper from "./transformers/TypeMapper";

class ModuleFactory{
  moduleId = 0;
  /**
   * @param {string} filename Name of the file to produce Module type
   * @returns {import("./types/types").Module}
   * @memberof ModuleFactory
   */
  createModule(filename){
    this.moduleId += 1;

    const source = fs.readFileSync(filename, "utf8");
    const type = path.extname(filename);

    return {
      ...TypeMapper[type].transform(source),
      filename,
      moduleId: this.moduleId,
    };
  }

}

export default new ModuleFactory();
