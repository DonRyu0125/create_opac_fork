import chalk from "chalk";
import { Command } from "commander";

function main() {
  const program = new Command();
  program
    .name("Page React Component Generator")
    .description("CLI to create React component")
    .version("0.0.1");

  program
    .option("-n --name", "React component name")
    .option("-t, --template", "specify a template");

  program.parse();
}

main();
