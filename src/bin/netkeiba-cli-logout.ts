#!/usr/bin/env node
import { Command } from "commander";
import { logger } from "netkeiba/dist/lib";
import * as NodeFileCache from "node-file-cache";
import { cookieFile, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .action(() => {
    try {
      const cache = NodeFileCache.create({ file: cookieFile() });
      if (cache.get("netkeiba") || cache.get("nkauth")) {
        cache.clear();
        logger.info("Logged out");
      } else {
        logger.warn("Not logging in");
      }
    } catch (e) {
      stderr.error(e);
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
