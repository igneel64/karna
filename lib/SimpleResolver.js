import path from "path";
import fs, { promises as fsAsync } from "graceful-fs";
import Configuration from "./Configuration";
import { asyncFind } from "./util";

const { config: { extensions, libSource } } = Configuration;

/**
 * @description Resolves the path of file dependencies. Allows for valid extensions and extensionless .js imports
 * @returns {import("./types/types").Resolver}
 */
const SimpleResolver = () => ({
    async resolve(absPath){
      const extension = path.extname(absPath);
      if(extension){
        if(!extensions.includes(extension)){
          throw new Error("Unrecognized extension");
        }
        return absPath;
      }
      return await this.resolveExtensionInOrder(absPath);
    },
    async resolveExtensionInOrder(extensionlessPath){
      return await asyncFind(
        extensions.map(ext => extensionlessPath + ext),
        async file => {
          try{
            await fsAsync.access(file, fs.constants.R_OK);
            return file;
          }catch(e){
            return false
          }
        }
      ); 
    },
    async resolveRootModule(moduleName){
      // Look in the config or just node_modules for now
      const absModulePath = path.resolve(process.cwd(), libSource, moduleName);

      if(path.extname(moduleName)){
        return absModulePath;
      }

      const isFile = await this.resolveExtensionInOrder(absModulePath);
      if(isFile){
        return isFile;
      }

      const packageFile = await fsAsync.readFile(path.resolve(absModulePath, "package.json"), "utf-8");
      const { browser, module, main } = JSON.parse(packageFile);

      return path.resolve(absModulePath, browser || module || main || "index.js");
    }
});

export default SimpleResolver();
