import * as winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";

import { EnvVars } from "./validateEnv";
import { NodeEnvEnum } from "./validateEnv";

const { combine, timestamp, prettyPrint } = winston.format;

export enum Severity {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}

export type SeverityType = "info" | "warn" | "error";

const esTransportOpts = {
  level: "info",
  index: "account-test",
  clientOpts: { node: EnvVars.ES_NODE }
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

export const Logger = winston.createLogger({
  // level: "info",
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: "account-test" },
  // in a more professional app this will be logged to elasticsearch (kibana) or something alike
  // for this test we just log into a file
  transports: EnvVars.APM_ENABLE
    ? [esTransport]
    : [
        new winston.transports.File({
          filename: "./logs/info.log",
          level: "info"
        }),
        new winston.transports.File({
          filename: "./logs/warn.log",
          level: "warn"
        }),
        new winston.transports.File({
          filename: "./logs/error.log",
          level: "error"
        })
      ]
});

Logger.on("error", (error) => {
  console.error("!!!!!!!!!!!!!!!!Logger Error caught", error);
});

esTransport.on("error", (error) => {
  console.error("!!!esTransport error", error);
});

if (EnvVars.NODE_ENV === NodeEnvEnum.DEVELOPMENT) {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}
