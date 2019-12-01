import fs from "graceful-fs";
import Output from "./Output";
import Compilation from "./Compilation";
import IIFEType from "./IIFEType";
import Configuration from "./Configuration";

/**
 * @export
 * @param {object} inputOptions
 * @param {string} inputOptions.entry Entry module e.g. ./src/index.js
 * @param {string} inputOptions.output Directory to output the bundle ./dist
 */
export default function karna(inputOptions){
  
  Configuration.create(inputOptions);
  const graph = Compilation.start();
  const IIFE = IIFEType.create(graph);

  fs.writeFileSync(
    Output.getFile(),
    IIFE
  );

}
