import path from "path";
import fs from "graceful-fs";
import Configuration from "./Configuration";

const Output = () => ({
  getFile() {
    const { config: { output, main } } = Configuration;
    fs.existsSync(output) || fs.mkdirSync(output);
    return path.resolve(output, main);
  }
});

export default Output();
