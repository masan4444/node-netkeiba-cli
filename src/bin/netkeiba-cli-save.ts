#!/usr/bin/env node
import fs from "fs/promises";
import { Command } from "commander";
import * as netkeiba from "netkeiba";
import { logger, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .argument("<parsed-json>")
  .argument("<sqlite>")
  .action(async (parsedFile: string, dbfile: string) => {
    try {
      const races = JSON.parse(
        await fs.readFile(parsedFile).then((buffer) => buffer.toString())
      ) as netkeiba.Race[];
      logger.info(`Detected ${races.length} races from ${parsedFile}`);
      logger.info(`Inserting to ${dbfile}...`);
      await netkeiba.initDB(dbfile);
      await netkeiba.saveRace(races);
      logger.info("Complete");
    } catch (e) {
      stderr.error(e);
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
