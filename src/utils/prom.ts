import client from "prom-client";
import { Logger } from "./logger";

const prom = (() => {
  let register: client.Registry;
  let httpRequestTimer: client.Histogram<"method" | "route" | "code">;

  const makeRegister = () => {
    register = new client.Registry();

    register.setDefaultLabels({
      app: "account-test-app"
    });

    client.collectDefaultMetrics({ register });

    // Create a histogram metric
    httpRequestTimer = new client.Histogram({
      name: "http_request_duration_seconds",
      help: "Duration of HTTP requests in seconds",
      labelNames: ["method", "route", "code"],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
    });

    register.registerMetric(httpRequestTimer);
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
    }
  };
})();

export const Prometheus = prom.getRegister();
export const HttpRequestTimer = prom.getTimer();
