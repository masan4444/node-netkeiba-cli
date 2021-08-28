#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import * as netkeiba from "netkeiba";
import {
  parseInterval,
  logger,
  stderr,
  progressBar,
  openCookieCache,
} from "../lib";

const parseOut = (out: string | undefined): string => {
  if (out === undefined) {
    throw new Error(`missing required argument '--out'`);
  } else {
    return out;
  }
};

const program = new Command();
program
  .version("1.0.0")
  .option("-o, --out <html-dir>", "output html directory")
  .option("-t, --time <interval>", "time interval(ms)", "1000")
  .argument("<url-file>")
  .action(async (urlFile: string) => {
    try {
      const outDir = parseOut(program.opts().out);
      const interval = parseInterval(program.opts().time);

      const cache = openCookieCache();
      const cookies = ["netkeiba", "nkauth"]
        .map((key) => ({
          key,
          value: cache.get(key) as string | null,
        }))
        .filter((kv): kv is { key: string; value: string } => Boolean(kv.value))
        .map(({ key, value }) => `${key}=${value}`);

      if (cookies.length === 2) {
        logger.info("Logging in");
        netkeiba.setCookie(`${cookies[0]}; ${cookies[1]}`);
      } else {
        logger.warn("Not logging in ");
      }

      const raceUrls = await fs
        .readFile(urlFile)
        .then((buffer) => buffer.toString().split("\n").filter(Boolean));
      const { length } = raceUrls;
      logger.info(`Downloading ${length} html files based on ${urlFile}...`);

      progressBar.start(length, 0);

      await fs.mkdir(outDir, { recursive: true });
      // eslint-disable-next-line no-restricted-syntax
      for await (const { id, html } of netkeiba.raceHtmlGenerator(
        raceUrls,
        interval
      )) {
        await fs.writeFile(path.join(outDir.toString(), `${id}.html`), html);
        progressBar.increment();
      }
      progressBar.stop();
    } catch (e) {
      progressBar.stop();
      stderr.error(e);
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
