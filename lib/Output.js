import path from "path";
import fs from "graceful-fs";
import Configuration from "./Configuration";

const Output = () => ({
  getFile() {
    const { config: { output, main } } = Configuration;
    const dirName = path.resolve(process.cwd() , output);
    fs.existsSync(dirName) || fs.mkdirSync(dirName);
    return path.resolve(dirName, main);
  }
});

export default Output();
