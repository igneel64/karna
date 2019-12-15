import * as babel from "@babel/core";
import BaseTransformer from "./BaseTransformer";
import { getDependencies } from "../DependencyTraversal";
import Configuration from "../Configuration";

const { config: { libSource } } = Configuration;
class JSTransformer extends BaseTransformer {
  _type = ".js";

  async transform(source, filename) {
    const ast = await babel.parseAsync(source, {
      plugins: ["@babel/plugin-syntax-jsx"]
    });

    const deps = getDependencies(ast);
    const transformOpts = filename.match(libSource) 
      ? { plugins: ["@babel/plugin-transform-modules-commonjs"] }
      : { presets: ["@babel/env"], plugins: ["@babel/plugin-transform-react-jsx"] };

    const transformedBabel = await babel.transformAsync(source, {
      ...transformOpts,
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
