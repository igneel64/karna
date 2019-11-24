import path from "path";
/**
 * @typedef Config Main bundling configuration
 * @property {string[]} extensions Array of valid extensions to resolve
 * @property {string} output Output directory
 * @property {string} main Main compilation filename
 * @property {string} entry Entrypoint for the compilation
 */

/**
 * @type {Config}
 */
const BaseConfig = {
  extensions: [".js"],
  output: "dist",
  main: "bundle.js",
  entry: path.resolve(process.cwd() + "/src/index.js")
}

class Configuration{
  constructor(){
    this.config = {...BaseConfig};
  }

  create(inputConfig){
    // This should go to sade input config
    if(inputConfig.entry){
      inputConfig.entry = path.resolve( process.cwd() , inputConfig.entry);
    }

    this.config = {
      ...this.config,
      ...inputConfig
    }
    return this.config;
  }

}

export default new Configuration();
