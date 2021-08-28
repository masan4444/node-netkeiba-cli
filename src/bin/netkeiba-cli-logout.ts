#!/usr/bin/env node
import { Command } from "commander";
import { logger } from "netkeiba/dist/lib";
import { openCookieCache, stderr } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .action(() => {
    try {
      const cache = openCookieCache();
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
