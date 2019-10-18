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
      const value = fcalEng.evaluate(line) as Type.Numberic;
      // tslint:disable-next-line:no-console
      console.log(value.print());
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(colors.red(`Error ${error.stack}`));
    }
    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
}

main();
