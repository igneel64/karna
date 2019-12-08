class BaseTransformer {
  constructor() {
    if (this.constructor === BaseTransformer) {
      throw new Error("Abstract Transformer");
    }
  }

  getType() {
    return this._type;
  }

  // TODO: Implement Custom Errors
  transform() {
    throw new Error("Abstract Transformation");
  }
}

export default BaseTransformer;
