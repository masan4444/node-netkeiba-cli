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

export const netkeibaLogger = Log4js.getLogger("netkeiba");
setLogger(netkeibaLogger);
