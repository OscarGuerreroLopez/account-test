import client from "prom-client";

export const summary = (register: client.Registry): void => {
  const s = new client.Summary({
    name: "node_my_summary",
    help: "This is my summary",
    percentiles: [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999]
  });

  register.registerMetric(s);
};
