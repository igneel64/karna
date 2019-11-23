import path from "path";
import fs from "graceful-fs";
import baseConf from "./Config";
const { output, main } = baseConf;

const Output = () => ({
  getFile() {
    const dirName = process.cwd() + "/" + output;
    fs.existsSync(dirName) || fs.mkdirSync(dirName);
    return path.resolve(dirName, main);
  }
});

export default Output();
