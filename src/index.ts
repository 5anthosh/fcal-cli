#!/usr/bin/env node

import colors = require("colors");
import readline = require("readline");
import { Fcal, Type } from "fcal";

function main() {
  const fcalEng = new Fcal();
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
    try {
      const value = fcalEng.evaluate(line);
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
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(colors.red(`${error.message}`));
    }
    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
}

main();
