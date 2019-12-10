import { toMatchFile } from 'jest-file-snapshot';
import karna from "../../lib/index";
import path from "path";
import fs from "graceful-fs";
import Compilation from "../../lib/Compilation";
import { CompilationTimingHandler } from "../util/handlers";

expect.extend({ toMatchFile });
const FIXTURES_DIR = path.resolve(__dirname, "../fixtures");

describe("sane bundles", () => {
  const dirs = fs.readdirSync(FIXTURES_DIR);
    it.each(dirs)("building %s", async projectDir => {
      const $compilationProxy = new Proxy(new Compilation(), CompilationTimingHandler);
      let resolvedDir = path.resolve(FIXTURES_DIR, projectDir);
      const prevDir = process.cwd();
      process.chdir(resolvedDir);

      await karna({ output: "./dist", entry: "./src/index.js"}, $compilationProxy);

      process.chdir(prevDir);
      const outputDir = path.resolve(resolvedDir, 'dist');
      const outputFiles = fs.readdirSync(outputDir);
      outputFiles.forEach( file => {
        expect(fs.readFileSync(path.resolve(outputDir, file), { encoding: "utf8" })).toMatchFile();
      });
    });
});
