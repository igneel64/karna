import JSTransformer from "./JSTransformer";
import JSONTransformer from "./JSONTransformer";

/**
 * @export
 * @description Mapping object from extensions to transformers
 */
export default {
  '.js': JSTransformer,
  '.json': JSONTransformer
}
