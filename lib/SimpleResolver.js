import path from "path";
import fs from "graceful-fs";
import Configuration from "./Configuration";

const { config: { extensions } } = Configuration;

/**
 * @description Resolves the path of file dependencies. Allows for valid extensions and extensionless .js imports
 * @returns {import("./types/types").Resolver}
 */
const SimpleResolver = () => ({
    resolve(absPath){
      const extension = path.extname(absPath);
      if(extension){
        if(!extensions.includes(extension)){
          throw new Error("Unrecognized extension");
        }
        return absPath;
      }
      return this.resolveExtensionInOrder(absPath);
    },
    resolveExtensionInOrder(extensionlessPath){
      return extensions
      .map(ext => extensionlessPath + ext)
      .find( file => fs.existsSync(file) );
    },
    resolveRootModule(moduleName){
      // Look in the config or just node_modules for now
      const absModulePath = path.resolve(process.cwd(), "node_modules", moduleName);
      const fileExists = fs.existsSync(absModulePath);
      if(!fileExists){
        throw "Dependency not found in node_modules"
      }

      const isFile = fs.lstatSync(absModulePath).isFile();
      if(isFile){
        return path.extname(absModulePath) 
          ? absModulePath
          : this.resolveExtensionInOrder(absModulePath);
      }
      const packageFile = fs.readFileSync(path.resolve(absModulePath, "package.json"), "utf-8");
      const { browser, module, main } = JSON.parse(packageFile);
      return path.resolve(absModulePath, browser || module || main || "index.js");
    }
});

export default SimpleResolver();
