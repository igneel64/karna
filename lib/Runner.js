import sade from "sade";
import karna from ".";
import { version } from "../package";

const runner = sade("karna");

runner
  .version(version)
  .option("--entry, -i", "Entry module")
  .option("--output, -o", "Directory to output the file");

runner
  .command("build")
  .action(karna);

runner.parse(process.argv)
