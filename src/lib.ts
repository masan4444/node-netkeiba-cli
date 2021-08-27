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

export const parseInterval = (interval: string): number => {
  const i = parseInt(interval, 10);
  if (Number.isNaN(i)) {
    throw new Error(`InvalidInterval(${interval})`);
  } else if (i < 100) {
    throw new Error(`TooShortInterval(${i})`);
  } else {
    return i;
  }
};
