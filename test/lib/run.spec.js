import karna from "../../lib/index";
import path from "path";
import fs from "graceful-fs";
import Compilation from "../../lib/Compilation";
import { CompilationTimingHandler } from "../util/handlers";

const FIXTURES_DIR = path.resolve(__dirname, "../fixtures");

describe("sane bundles", () => {
  const dirs = fs.readdirSync(FIXTURES_DIR);
    it.each(dirs)("building %s", async projectDir => {
      const $compilationProxy = new Proxy(new Compilation(), CompilationTimingHandler);
      let resolvedDir = path.resolve(FIXTURES_DIR, projectDir);
      const prevDir = process.cwd();
      process.chdir(resolvedDir);

      const result = await karna({ output: "./dist", entry: "./src/index.js"}, $compilationProxy);

      process.chdir(prevDir);
      return result;
    });
});
