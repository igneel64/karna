import * as babel from "@babel/core";
import BaseTransformer from "./BaseTransformer";
import { getDependencies } from "../DependencyTraversal";

// Maybe inherit some methods from Something..
class JSTransformer extends BaseTransformer {
  _type = ".js";

  async transform(source) {
    const ast = await babel.parseAsync(source);
    const deps = getDependencies(ast);

    const transformedBabel = await babel.transformFromAstAsync(ast, null, {
      presets: ["@babel/env"],
      sourceType: "module",
      compact: true,
      minified: true,
      comments: false,
    });
        
    return {
      code: transformedBabel.code,
      deps
    }
  }

}


export default new JSTransformer();
