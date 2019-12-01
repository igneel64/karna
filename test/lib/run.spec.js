import karna from "../../lib/index";
import path from "path";
import fs from "graceful-fs";

const FIXTURES_DIR = path.resolve(__dirname, "../fixtures");

describe("sane bundles", () => {
  const dirs = fs.readdirSync(FIXTURES_DIR);
    it.each(dirs)("building %s", projectDir => {
      let resolvedDir = path.resolve(FIXTURES_DIR, projectDir);
      const prevDir = process.cwd();
      process.chdir(resolvedDir);

      karna({ output: "./dist", entry: "./src/index.js"});

      process.chdir(prevDir);
    });
});
