#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();
program
  .version("1.0.0")
  .command("login", "login netkeiba.com")
  .command("logout", "logout netkeiba.com")
  .command("crawl", "collect race urls")
  .command("fetch [file]", "download html based on [file]")
  .command("parse [dir]", "parse html files in [dir]")
  .command("save [file]", "save parsed data to DB")
  .parse(process.argv);
