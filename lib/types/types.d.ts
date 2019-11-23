/**
 * Valid object for compilation
 */
export interface Module{
  filename: string;
  code: string;
  deps: Array<string>;
  moduleId: number;
  dependencyMap?: object;
}

export interface IIFEType{
  /**
   * @param graph Graph containing the bundled dependencies
   * @returns IIFEType module to ship to the browser
   */
  create(graph: Module[]): string;
}

export interface Resolver{
  /**
   * @param absPath Absolute dependency path
   * @returns Resolved path with extension
   */
  resolve(absPath: string): string; 
}
