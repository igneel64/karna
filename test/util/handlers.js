const CompilationTimingHandler = {
  get: (target, propKey, receiver) => {
    const result = Reflect.get(target, propKey);
    if(typeof result === 'function'){
      return function(...args){
        if(propKey === "start"){
          console.time("Compilation");
        }
        if(propKey === "end"){
          console.timeEnd("Compilation");
        }
        return Reflect.apply(result, this, args);
      }
    }
    return Reflect.get(target, propKey, receiver);
  },
};

export {
  CompilationTimingHandler
}
