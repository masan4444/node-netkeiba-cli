#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import * as netkeiba from "netkeiba";
import { logger } from "netkeiba/dist/lib";
import { stderr, openCookieCache } from "../lib";

const program = new Command();
program
  .version("1.0.0")
  .option("-m, --mail <mail>", "login ID")
  .option("-p --password [password]", "password")
  .action(async () => {
    try {
      const { mail, password } = await (async () => {
        if (program.opts().mail && program.opts().password) {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          return program.opts() as { mail: string; password: string };
        }
        return inquirer
          .prompt([
            {
              name: "mail",
              message: "Enter your mail (login ID).",
            },
            {
              type: "password",
              name: "password",
              message: "Enter your password.",
              mask: "*",
            },
          ])
          .then((answers: { mail: string; password: string }) => answers);
      })();

      const cookies = await netkeiba.login(mail, password);
      if (cookies.length) {
        const cache = openCookieCache();
        cookies.forEach((cookie) => {
          cache.set(cookie.key, cookie.value, {
            life: cookie.TTL(new Date()) / 1000.0,
          });
        });
        logger.info("Login succeeded");
      } else {
        logger.error("Login failed");
      }
    } catch (e) {
      stderr.error(e);
      process.stderr.write(`\n${program.helpInformation()}`);
    }
  })
  .parse(process.argv);
