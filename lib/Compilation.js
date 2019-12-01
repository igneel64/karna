import path from "path";
import ModuleFactory from "./ModuleFactory";
import SimpleResolver from "./SimpleResolver";
import Configuration from "./Configuration";

class Compilation{

  start(){
    const { config: { entry } } = Configuration;
    const queue = [ModuleFactory.createModule(entry)];

    for(let asset of queue){
      asset.dependencyMap = {};
      const dirname = path.dirname(asset.filename);
      asset.deps.forEach(dependency => {
        // Think about how to pass the "no transpile dependency"
        // 1) Pass an object to create Module, mentioning if it is our own
        // 2) Create a different method for ModuleFactory that discerns the two
        const isModule = !dependency.charAt(0).match(/\.|\//)
        const dependencyPath = path.join(dirname, dependency);
        const resolvedDep = isModule 
          ? SimpleResolver.resolveRootModule(dependency) 
          : SimpleResolver.resolve(dependencyPath);
        const module = ModuleFactory.createModule(resolvedDep);
        asset.dependencyMap[dependency] = module.moduleId;
        queue.push(module);
      });
    }

    return queue;
  }

}

export default new Compilation();
