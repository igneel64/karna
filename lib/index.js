import fs from "graceful-fs";
import Output from "./Output";
import Compilation from "./Compilation";
import IIFEType from "./IIFEType";

const graph = Compilation.start();

const IIFE = IIFEType.create(graph);

fs.writeFileSync(
  Output.getFile(),
  IIFE
);

