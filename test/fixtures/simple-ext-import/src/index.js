import Terser, { TreeTransformer, TreeWalker } from "terser";

var tw = new TreeWalker(function(node, descend) {
  if (node.TYPE === "SymbolDefun"){
    node.name = "changedFunctionName";
  };
  descend(node.body);
  return true
});

const tt = new TreeTransformer(function(self){
  self.walk(tw);
  return self;
});

const parsedCode = Terser.parse(`function tester(){ return console.log("test code to bundle"); }`).transform(tt);

console.log(parsedCode.print_to_string());
