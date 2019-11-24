(function(modules){
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
})({1: [ 
      function(require, module, exports){ "use strict";var s=require("./message.js");var a=1;var heading=document.createElement("h1");heading.textContent=s+a;document.body.appendChild(heading); },
      {"./message.js":2} ],2: [ 
      function(require, module, exports){ "use strict";var _message=_interopRequireDefault(require("./msg/message2"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}module.exports="message"+_message["default"]; },
      {"./msg/message2":3} ],3: [ 
      function(require, module, exports){ "use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _default=2;exports["default"]=_default; },
      {} ],});