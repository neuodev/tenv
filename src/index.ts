import { program } from "commander";
import { TypesGenerator } from "./types";
// --sys
// --dotenv
// --all

program
  .name("tenv")
  .description("Generate types for environment variables on the fly")
  .version("tenv: 0.0.1", "-v, --version")
  .option(
    "--dotenv <path>",
    "Generate types for environment variables located in a dotenv file"
  )
  .option(
    "--sys",
    "Generate types for all environment variables existed at the system level. All variables located in `process.env`"
  )
  .option(
    "--all <path>",
    "Generate types for all environment variables dotenv + system"
  )
  .argument("<output-file>", "File path where to output the types");

main();
function main() {
  program.parse(process.argv);

  const options = program.opts();
  const typesGenerator = new TypesGenerator(program.args[0]);

  if (options.dotenv) return typesGenerator.fromDotenv(options.dotenv);
  if (options.all) return typesGenerator.allVars(options.all);
  if (options.sys) return typesGenerator.fromSys();
}
