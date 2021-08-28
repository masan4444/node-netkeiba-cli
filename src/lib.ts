import path from "path";
import cliProgress from "cli-progress";
import Log4js from "log4js";
import { setLogger } from "netkeiba";
import * as NodeFileCache from "node-file-cache";

Log4js.configure({
  appenders: {
    stderr: { type: "stderr" },
    stdout: { type: "stdout" },
  },
  categories: {
    default: { appenders: ["stdout"], level: "all" },
    netkeibaErr: { appenders: ["stderr"], level: "warn" },
    stderr: { appenders: ["stderr"], level: "warn" },
  },
});

export const logger = Log4js.getLogger("netkeiba-cli");

export const stderr = Log4js.getLogger("stderr");

setLogger(Log4js.getLogger("netkeiba"));

export const parseInterval = (interval: string): number => {
  const i = parseInt(interval, 10);
  if (Number.isNaN(i)) {
    throw new Error(`invalid interval (${interval})`);
  } else if (i < 100) {
    throw new Error(`too short interval (${i})`);
  } else {
    return i;
  }
};

const home = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

const cookieFile = (): string => {
  if (home) {
    return path.join(home, ".netkeiba-cookie.json");
  }
  throw new Error("can't open cookie file");
};

export const openCookieCache = (): NodeFileCache.Cache =>
  NodeFileCache.create({ file: cookieFile() });

export const progressBar = new cliProgress.SingleBar({
  format: `[{bar}] {value}/{total} files | time: {duration_formatted} | ETA: {eta_formatted}`,
  barsize: 18,
  barCompleteChar: "\u2588",
  barIncompleteChar: ".",
  hideCursor: true,
});
