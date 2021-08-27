#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import Log4js from "log4js";
import * as netkeiba from "netkeiba";
import { parseInterval, logger, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .option("-o, --out [html-dir]", "output html directory")
  .option("-t, --time <interval>", "time interval(ms)", "1000")
  .option("--silent", "don't display progress percentage")
  .argument("<url-file>")
  .action(async (urlFile: string) => {
    try {
      const outDir = program.opts().out as string;
      const interval = parseInterval(program.opts().interval);
      const silent = program.opts().silent as boolean;

      const raceUrls = await fs
        .readFile(urlFile)
        .then((buffer) => buffer.toString().split("\n").filter(Boolean));
      const { length } = raceUrls;
      logger.info(`downloading ${length} html files based on ${urlFile}...`);
      let count = 0;
      let progress = 0;
      await fs.mkdir(outDir, { recursive: true });
      netkeiba.setLogger(Log4js.getLogger("netkeiba"));
      // eslint-disable-next-line no-restricted-syntax
      for await (const [id, html] of netkeiba.raceHtmlGenerator(
        raceUrls,
        interval
      )) {
        await fs.writeFile(path.join(outDir.toString(), `${id}.html`), html);
        if (!silent && length > 100 && count === Math.ceil(progress)) {
          logger.info(`progress: ${Math.ceil((progress / length) * 100)}%`);
          progress += length / 100;
        }
        count += 1;
      }
      logger.info(`downloaded ${count} html files`);
    } catch (e) {
      stderr.error(e);
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
