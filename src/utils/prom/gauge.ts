import client from "prom-client";

export const gauge = (register: client.Registry): void => {
  const g = new client.Gauge({
    name: "node_my_gauge",
    help: "This is my gauge",
    labelNames: ["code"]
  });

  setInterval(() => {
    g.set({ code: 200 }, Math.random());
    g.set(Math.random());
    g.labels("300").inc();
    g.inc();
    g.set(22);
  }, 100);

  register.registerMetric(g);
};
