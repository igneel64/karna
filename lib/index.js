import Compilation from "./Compilation";
import IIFEType from "./IIFEType";
import Configuration from "./Configuration";

/**
 * @export
 * @param {object} inputOptions
 * @param {string} inputOptions.entry Entry module e.g. ./src/index.js
 * @param {string} inputOptions.output Directory to output the bundle ./dist
 * @param {Compilation} [injectedCompilation] Injected compilation object
 */
export default async function karna(inputOptions, injectedCompilation){
  let compilation = injectedCompilation || new Compilation();
  Configuration.create(inputOptions);
  const graph = await compilation.start();
  const IIFE = IIFEType.create(graph);
  await compilation.end(IIFE);
}
