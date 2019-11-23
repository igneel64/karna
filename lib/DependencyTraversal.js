import traverse from "@babel/traverse";

export const getDependencies = (ast) => {
  const dependencies = [];
  traverse(ast, {
    CallExpression(expr){
      if(expr.node.callee.name !== "require"){
        return;
      }
      const requirePath = expr.node.arguments[0].value;
      dependencies.push(requirePath);
    },
    ImportDeclaration(expr){
      const requirePath = expr.node.source.value;
      dependencies.push(requirePath);
    }
  });
  
  return dependencies
}
