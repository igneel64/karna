import baseConf from "./Config"
import path from "path";
import fs from "graceful-fs";
const { extensions } = baseConf;

/**
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
      return extensions
        .map(ext => absPath + ext)
        .find( file => fs.existsSync(file) );
    }
});

export default SimpleResolver();
