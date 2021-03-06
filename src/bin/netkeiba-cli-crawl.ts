#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import { parse as parseDate, isValid } from "date-fns";
import Log4js from "log4js";
import * as netkeiba from "netkeiba";
import { parseInterval, logger, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .option("-f, --format <format>", "date format", "yyyy/MM")
  .option("-t, --time <interval>", "time interval(ms)", "1000")
  .argument("<start-month>")
  .argument("<end-month>")
  .argument("[url-file]")
  .action(async (start, end, output) => {
    try {
      const format = program.opts().format as string;
      const interval = parseInterval(program.opts().time);
      const startMonth = parseDate(start, format, new Date());
      const endMonth = parseDate(end, format, new Date());
      if (!isValid(startMonth) || !isValid(endMonth)) {
        throw new Error("invalid date");
      }

      if (typeof output === "string") {
        await fs.mkdir(path.dirname(output), { recursive: true });
        logger.info(`Writing to ${output}...`);
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
