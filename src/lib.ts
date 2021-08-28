import path from "path";
import Log4js from "log4js";
import { setLogger } from "netkeiba";

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

export const cookieFile = (): string => {
  if (home) {
    return path.join(home, ".netkeiba-cookie.json");
  }
  throw new Error("cann't open cookie file");
};
