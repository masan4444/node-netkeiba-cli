#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import Log4js from "log4js";
import * as netkeiba from "netkeiba";
import { logger, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .argument("<html-dir>")
  .argument("[parsed-json]")
  .action(async (htmlDir: string, output) => {
    try {
      const htmlFiles = await fs.readdir(htmlDir);

      if (typeof output === "string") {
        await fs.mkdir(path.dirname(output), { recursive: true });
        logger.info(`Detected ${htmlFiles.length} html files`);
      } else {
        netkeiba.setLogger(Log4js.getLogger("netkeibaErr"));
      }

      const races = (
        await Promise.all(
          htmlFiles.map((filepath) =>
            fs
              .readFile(path.join(htmlDir, filepath))
              .then((buffer) => buffer.toString())
              .then((html) => netkeiba.parseRace(filepath, html))
              .catch((e) => {
                stderr.error(e);
                return undefined;
              })
          )
        )
      ).filter((race): race is netkeiba.Race => Boolean(race));

      if (output) {
        logger.info(`Success in parsing ${races.length} files`);
        await fs.writeFile(output, JSON.stringify(races));
      } else {
        process.stdout.write(JSON.stringify(races));
      }
    } catch (e) {
      stderr.error(e);
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
