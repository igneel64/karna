import * as babel from "@babel/core";
import BaseTransformer from "./BaseTransformer";
import { getDependencies } from "../DependencyTraversal";

// Maybe inherit some methods from Something..
class JSTransformer extends BaseTransformer {
  _type = ".js";

  transform(source) {
    const ast = babel.parseSync(source);
    const deps = getDependencies(ast);

    const transformedBabel = babel.transformFromAstSync(ast, null, {
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
