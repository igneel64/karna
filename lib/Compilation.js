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
        const dependencyPath = path.join(dirname, dependency);
        const resolvedDep = SimpleResolver.resolve(dependencyPath);
        const module = ModuleFactory.createModule(resolvedDep);
        asset.dependencyMap[dependency] = module.moduleId;
        queue.push(module);
      });
    }

    return queue;
  }

}

export default new Compilation();
