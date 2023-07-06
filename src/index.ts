import { program } from "commander";
// --sys
// --dotenv
// --all

program
  .name("tenv")
  .description("Generate types for environment variables on the fly")
  .version("tenv: 0.0.1", "-v, --version")
  .option(
    "-d, --dotenv <path>",
    "Generate types for environment variables located in a dotenv file"
  )
  .option(
    "-s, --sys",
    "Generate types for all environment variables existed at the system level. All variables located in `process.env`"
  )
  .option(
    "-a, --all <path>",
    "Generate types for all environment variables dotenv + system"
  );

//   declare var process: {
//     env: {};
//   };

main();
function main() {
  program.parse(process.argv);
  const options = program.opts();
  if (options.dotenv) return console.log("dotenv");
  if (options.all) return console.log("all");
  if (options.sys) return console.log("sys");
}
