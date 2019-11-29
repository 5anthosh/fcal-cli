#!/usr/bin/env node

import colors = require("colors");
import readline = require("readline");
import { Fcal, Type } from "fcal";

function main() {
  const fcalEng = new Fcal();

  if (process.argv.length == 3) {
    evaluate(fcalEng, process.argv[2]);
    process.exit(0);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt("fcal> ");
  rl.prompt();

  rl.on("line", line => {
    if (line === ".exit") {
      rl.close();
    }
    if (line.length > 0) {
      evaluate(fcalEng, line);
    }
    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
}

function printResult(value: Type) {
  if (value instanceof Type.Percentage) {
    console.log(
      `${colors.green(value.n.toString())} ${colors.bold(colors.blue("%"))}`
    );
  } else if (value instanceof Type.UnitNumber) {
    if (value.n.lessThanOrEqualTo(1) && !value.n.isNegative()) {
      console.log(
        `${colors.green(value.n.toString())} ${colors.bold(
          colors.blue(value.unit.singular)
        )}`
      );
    } else {
      console.log(
        `${colors.green(value.n.toString())} ${colors.bold(
          colors.blue(value.unit.plural)
        )}`
      );
    }
  } else {
    console.log(colors.green(value.print()));
  }
}

function evaluate(fcal: Fcal, source: string) {
  try {
    if (source.startsWith("#")) {
      source = source.replace(RegExp("^[#]"), "");
      const label = colors.blue("\nEvaluation time");
      console.time(label);
      const exp = fcal.expression(source);
      const value = exp.evaluate();
      console.timeEnd(label);
      console.log("");
      printResult(value);
      console.log(`\n${colors.red("AST")}\n${exp.getAST()}`);
      return;
    }
    const value = fcal.evaluate(source);
    printResult(value);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(colors.red(`${error.message}`));
  }
}

main();
