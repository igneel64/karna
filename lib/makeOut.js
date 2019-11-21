import path from "path";
import fs from "graceful-fs";

const dirName = "/dist";

const distExists = fs.existsSync(process.cwd() + dirName);
if(!distExists){
  fs.mkdirSync(process.cwd() + dirName);
}
const outputFilePath = path.resolve("dist", "bundle.js");

export default outputFilePath;
