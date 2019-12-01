import sade from "sade";
import karna from ".";
import { version } from "../package";

const runner = sade("karna");

runner
  .version(version)
  .option("--entry, -i", "Entry module", "./src/index.js")
  .option("--output, -o", "Directory to output the bundle", "./dist");

runner
  .command("build")
  .action(karna);

runner.parse(process.argv)
