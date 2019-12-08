import BaseTransformer from "./BaseTransformer";

class JSONTransformer extends BaseTransformer {
  _type = ".json";

  transform(source) {
    try {
      JSON.parse(source);
    } catch (error) {
      throw error; // Probably invalid JSON
    }
    const code = `module.exports = JSON.parse(${JSON.stringify(source)});`
    return {
      deps: [], // TODO: Make dependencies array default on createModule
      code
    }
  }
}

export default new JSONTransformer();
