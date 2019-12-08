import Terser from "terser";

export default function minify(source){
  return Terser.minify(source, {
    compress: {
      passes: 10
    }
  });
}
