import * as winston from "winston";

import { EnvVars } from "./validateEnv";
import { NodeEnvEnum } from "./validateEnv";

const { combine, timestamp, prettyPrint } = winston.format;

export enum Severity {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}

export type SeverityType = "info" | "warn" | "error";

export const Logger = winston.createLogger({
  // level: "info",
  format: combine(timestamp(), prettyPrint()),

  // in a more professional app this will be logged to elasticsearch (kibana) or something alike
  // for this test we just log into a file

  transports: [
    new winston.transports.File({
      filename: "./logs/info.log",
      level: Severity.INFO
    }),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: Severity.WARN
    }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: Severity.ERROR
    })
  ]
});

Logger.on("error", (error) => {
  console.error("!!!!!!!!!!!!!!!!Logger Error caught", error);
});

if (
  EnvVars.NODE_ENV === NodeEnvEnum.DEVELOPMENT ||
  EnvVars.NODE_ENV === NodeEnvEnum.TEST
) {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}
