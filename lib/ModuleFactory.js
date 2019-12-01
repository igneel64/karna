import fs from "graceful-fs";
import * as babel from "@babel/core";
import { getDependencies } from "./DependencyTraversal";

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
    const ast = babel.parseSync(source);
    const fileDependencies = getDependencies(ast);
    
    const transformedBabel = babel.transformFromAstSync(ast, null, {
      presets: ["@babel/env"],
      sourceType:"module",
      compact: true,
      minified: true,
      comments: false,
    });
  
    return {
      filename,
      code: transformedBabel.code,
      deps: fileDependencies,
      moduleId: this.moduleId
    }
    
  }

}

export default new ModuleFactory();
