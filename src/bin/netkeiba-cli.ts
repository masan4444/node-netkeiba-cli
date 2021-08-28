#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();
program
  .version("1.0.0")
  .command("login", "login netkeiba.com")
  .command("logout", "logout netkeiba.com")
  .command("crawl <start-month> <end-month>", "collect race urls")
  .command("fetch <url-file>", "download html based on <url-file>")
  .command("parse <html-dir>", "parse html files in <html-dir>")
  .command("save <file>", "save parsed data to DB")
  .parse(process.argv);
