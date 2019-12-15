import path from "path";
import { promises as fsAsync } from "graceful-fs";
import ModuleFactory from "./ModuleFactory";
import SimpleResolver from "./SimpleResolver";
import Configuration from "./Configuration";
import Output from "./Output";
import minify from "./transformers/TerserMinifier";
import { asyncForEach } from "./util";

class Compilation{
  moduleFactory = new ModuleFactory();

  async start(){
    const { config: { entry } } = Configuration;
    const queue = [await this.moduleFactory.createModule(entry)];

    await asyncForEach(queue, async asset => {
      if(!asset){
        return;
      }
      asset.dependencyMap = {};
      const dirname = path.dirname(asset.filename);
      await asyncForEach(asset.deps, async dependency => {        
        // Think about how to pass the "no transpile dependency"
        // 1) Pass an object to create Module, mentioning if it is our own
        // 2) Create a different method for ModuleFactory that discerns the two
        const isModule = !dependency.charAt(0).match(/\.|\//);
        const dependencyPath = path.join(dirname, dependency);
        const resolvedDep = isModule 
          ? await SimpleResolver.resolveRootModule(dependency) 
          : await SimpleResolver.resolve(dependencyPath);
        const module = await this.moduleFactory.createModule(resolvedDep);
        asset.dependencyMap[dependency] = module.moduleId;
        queue.push(module);
      });
    });

    return queue;
  }

  end(outputSource){
    const { code: minifiedCode } = minify(outputSource);
    return fsAsync.writeFile(
      Output.getFile(),
      minifiedCode
    );
  };

}

export default Compilation;
