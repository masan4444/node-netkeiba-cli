#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import { parse as parseDate, isValid } from "date-fns";
import Log4js from "log4js";
import * as netkeiba from "netkeiba";
import { logger, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .option("-o, --out <file>", "output file")
  .option("-f, --format <format>", "date format", "yyyy/MM")
  .option("-t, --time <interval>", "time interval(ms)", "1000")
  .argument("<start-month>")
  .argument("<end-month>")
  .action(async (start, end) => {
    try {
      const output = program.opts().out as string | undefined;
      const format = program.opts().format as string;
      const interval = (() => {
        const i = parseInt(program.opts().time, 10);
        if (Number.isNaN(i)) {
          throw new Error(`InvalidInterval(${program.opts().time as string})`);
        } else if (i < 100) {
          throw new Error(`TooShortInterval(${i})`);
        } else {
          return i;
        }
      })();
      const startMonth = parseDate(start, format, new Date());
      const endMonth = parseDate(end, format, new Date());
      if (!isValid(startMonth) || !isValid(endMonth)) {
        throw new Error("InvalidDateError");
      }

      if (output) {
        netkeiba.setLogger(Log4js.getLogger("netkeiba"));
        await fs.mkdir(path.dirname(output), { recursive: true });
        logger.info(`writing to ${output}...`);
      } else {
        netkeiba.setLogger(Log4js.getLogger("netkeibaErr"));
      }

      // eslint-disable-next-line no-restricted-syntax
      for await (const raceUrl of netkeiba.raceUrlGenerator(
        startMonth,
        endMonth,
        interval
      )) {
        if (output) {
          await fs.appendFile(output, `${raceUrl}\n`);
        } else {
          process.stdout.write(`${raceUrl}\n`);
        }
      }
    } catch (e) {
      if (e instanceof RangeError) {
        stderr.error(`InvalidFormatError: ${program.opts().format as string}`);
      } else {
        stderr.error(e);
      }
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
