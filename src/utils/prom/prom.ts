import client from "prom-client";
import { Logger } from "../logger";
import { histogram } from "./histogram";
import { gauge } from "./gauge";
import { summary } from "./summary";
import { counter } from "./counter";

const prom = (() => {
  let register: client.Registry;
  let httpRequestTimer: client.Histogram<"code" | "method" | "route">;
  let dbRequestTimer: client.Histogram<"operation" | "success">;
  const makeRegister = () => {
    register = new client.Registry();

    register.setDefaultLabels({
      app: "node-application-monitoring-app",
      prefix: "node_",
      timeout: 10000,
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
      register
    });

    client.collectDefaultMetrics({ register });

    // Other custom metrics and its usage

    // other histograms
    const { clientHistogram, databaseResponseTimeHistogram } =
      histogram(register);
    httpRequestTimer = clientHistogram;
    dbRequestTimer = databaseResponseTimeHistogram;

    // gauge
    gauge(register);

    // summary
    summary(register);

    // counter
    counter(register);
  };

  return {
    getRegister: () => {
      if (!register) {
        makeRegister();
      }
      Logger.info("returning prom client registry instance");
      return register;
    },
    getTimer: () => {
      if (!httpRequestTimer) {
        makeRegister();
      }
      Logger.info("returning prom httpRequestTimerinstance");
      return httpRequestTimer;
    },
    getDbTimer: () => {
      if (!dbRequestTimer) {
        makeRegister();
      }

      return dbRequestTimer;
    }
  };
})();

export const Prometheus = prom.getRegister();
export const HttpRequestTimer = prom.getTimer();
export const DbRequestTimer = prom.getDbTimer();
