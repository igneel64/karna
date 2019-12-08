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
  extensions: [".js", ".json"],
  output: path.resolve(process.cwd(), "dist"),
  main: "bundle.js",
  entry: path.resolve(process.cwd(), "./src/index.js")
}

/**
 * @singleton
 * @class Configuration
 * @description Handles the compilation configuration. The configuration module will have the responsibility of also modifying from "raw" -> "correct" configuration for the other components
 */
class Configuration {
  constructor() {
    this.config = { ...BaseConfig };
  }

  /**
   * @static
   * @description Cleans properties from the raw user input
   * @param {*} rawInputs
   * @memberof Configuration
   * @modifies rawInputs
   */
  static cleanInputs(rawInputs = {}) {
    let { entry, output } = rawInputs;

    return {
      ...rawInputs,
      // @ts-ignore
      ...(output && path.resolve(process.cwd(), output)),
      ...(entry && path.resolve(process.cwd(), entry)),
    }
  }

  create(inputConfig) {
    this.config = {
      ...this.config,
      ...Configuration.cleanInputs(inputConfig)
    }
    return this.config;
  }

}

export default new Configuration();
