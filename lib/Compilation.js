import path from "path";
import BaseConfig from "./Config";
import ModuleFactory from "./ModuleFactory";
import SimpleResolver from "./SimpleResolver";

class Compilation{
  queue = [ModuleFactory.createModule(BaseConfig.entry)];

  start(){
    for(let asset of this.queue){
      asset.dependencyMap = {};
      const dirname = path.dirname(asset.filename);
      asset.deps.forEach(dependency => {
        const dependencyPath = path.join(dirname, dependency);
        const resolvedDep = SimpleResolver.resolve(dependencyPath);
        const module = ModuleFactory.createModule(resolvedDep);
        asset.dependencyMap[dependency] = module.moduleId;
        this.queue.push(module);
      });
    }

    return this.queue;
  }

}

export default new Compilation();
