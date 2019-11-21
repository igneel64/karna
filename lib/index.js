import * as babel from "@babel/core";
import fs from "graceful-fs";
import path from "path";
import traverse from "@babel/traverse";
import outputFile from "./makeOut";

let moduleId = 0;

function traverseFile(filename){
  const code = fs.readFileSync(filename, "utf8");

  const sourceAST = babel.parseSync(code);
  
  const fileDependencies = [];
  moduleId += 1;

  traverse(sourceAST, {
    CallExpression(expr){
      if(expr.node.callee.name !== "require"){
        return;
      }
      const requirePath = expr.node.arguments[0].value;
      fileDependencies.push(requirePath);
    },
    ImportDeclaration(expr){
      const requirePath = expr.node.source.value;
      fileDependencies.push(requirePath);
    }
  });

  // applyTransformations;
  const transformedBabel = babel.transformFromAstSync(sourceAST, null, {
    presets: ["@babel/env"],
    sourceType:"module",
    compact: true,
  });

  return {
    filename,
    code: transformedBabel.code,
    deps: fileDependencies,
    moduleId
  }
}

const queue = [traverseFile(path.resolve(process.cwd(), "./src/index.js"))];

for(let asset of queue){

  asset.dependencyMap = {};
  const dirname = path.dirname(asset.filename);
  asset.deps.forEach(dependency => {
    const absPath = path.join(dirname, dependency);
    const newDependency = traverseFile(absPath);
    asset.dependencyMap[dependency] = newDependency.moduleId;
    queue.push(newDependency);
  });
}

// create an object based on module ids and mapping to be included on the bundle
const moduleEntries = queue.reduce( (modules, module) => {
  return modules + `${module.moduleId}: [ function(require, module, exports){ ${module.code} }, ${JSON.stringify(module.dependencyMap)} ],`
}, "");

const IIFETemplate = `(function(modules){
  function require(id){
    const [fn, localMapping] = modules[id];
    function localRequire(relPath){
      return require(localMapping[relPath]);
    }
    const module = { exports : {} };
    fn(localRequire, module, module.exports);
    return module.exports;
  }

  require(1);
})({${moduleEntries}});`;

fs.writeFileSync(
  outputFile,
  IIFETemplate
);

