import client from "prom-client";
export interface HistogramFun {
  clientHistogram: client.Histogram<"code" | "method" | "route">;
  databaseResponseTimeHistogram: client.Histogram<"operation" | "success">;
}
export const histogram = (register: client.Registry): HistogramFun => {
  const clientHistogram = new client.Histogram({
    name: "account_histogram_time_seconds",
    help: "This is my sample histogram",
    labelNames: ["code", "method", "route"]
    // buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
  });

  const databaseResponseTimeHistogram = new client.Histogram({
    name: "db_histogram_time_seconds",
    help: "This is my sample histogram for DB",
    labelNames: ["operation", "success"]
    // buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
  });

  register.registerMetric(clientHistogram);
  register.registerMetric(databaseResponseTimeHistogram);

  return { clientHistogram, databaseResponseTimeHistogram };
};
