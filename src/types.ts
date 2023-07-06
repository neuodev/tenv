import fs from "node:fs";
export class TypesGenerator {
  constructor(private readonly outputFile: string) {}

  public fromSys() {
    const varNames = this.parseFromSys();
    const types = this.declareTypes(varNames);
    this.save(types);
  }

  public fromDotenv(path: string) {
    const varNames = this.parseFromDotenv(path);
    const types = this.declareTypes(varNames);
    this.save(types);
  }

  public allVars(dotenvPath: string) {
    const allVarNames = this.parseFromDotenv(dotenvPath).concat(
      this.parseFromSys()
    );
    const types = this.declareTypes(allVarNames);
    this.save(types);
  }

  private declareTypes(varNames: string[]): string {
    return [
      "declare namespace NodeJS {",
      "  export interface ProcessEnv {",
      ...varNames.map((varName) => `    ${varName}: string;`),
      "  }",
      "}",
    ].join("\n");
  }

  private save(types: string) {
    fs.writeFileSync(this.outputFile, types);
  }

  private parseFromDotenv(path: string): string[] {
    const varNames = fs
      .readFileSync(path)
      .toString()
      .split("\n")
      .map((line) => line.split("=")[0]);

    if (varNames.some((varName) => !varName))
      throw new Error(`"${path}" is not a valid dotenv file`);

    return varNames;
  }

  private parseFromSys(): string[] {
    return Object.keys(process.env);
  }
}
