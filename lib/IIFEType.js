const IIFETemplate = (moduleEntries) => `(function(modules){
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

const IIFEType = () => ({
  create(graph) {
    const moduleEntries = graph.reduce((modules, module) =>
      modules + `${module.moduleId}: [ 
      function(require, module, exports){ ${module.code} },
      ${JSON.stringify(module.dependencyMap)} ],`
      , "");
    return IIFETemplate(moduleEntries);
  }
})

export default IIFEType();
