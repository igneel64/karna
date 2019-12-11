import path from "path";
import fs, { promises as fsAsync } from "graceful-fs";
import Configuration from "./Configuration";

const { config: { extensions, libSource } } = Configuration;

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
    async resolveRootModule(moduleName){
      // Look in the config or just node_modules for now
      const absModulePath = path.resolve(process.cwd(), libSource, moduleName);

      // TODO: check if the path does not exist
      const modulePath = await fsAsync.lstat(absModulePath)
      
      if(modulePath.isFile()){
        return path.extname(absModulePath) 
          ? absModulePath
          : this.resolveExtensionInOrder(absModulePath);
      }
      const packageFile = await fsAsync.readFile(path.resolve(absModulePath, "package.json"), "utf-8");
      const { browser, module, main } = JSON.parse(packageFile);
      return path.resolve(absModulePath, browser || module || main || "index.js");
    }
});

export default SimpleResolver();
