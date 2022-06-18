import cluster from "cluster";
import client from "prom-client";

export const counter = (register: client.Registry): void => {
  const c = new client.Counter({
    name: "node_my_counter",
    help: "This is my counter",
    labelNames: ["code"]
  });

  const sc = new client.Counter({
    name: "node_my_scrape_counter",
    help: "Number of scrapes (example of a counter with a collect fn)",
    collect() {
      this.inc();
    }
  });

  setInterval(() => {
    c.inc({ code: 200 });
    c.inc({ code: 400 });
    c.inc();
    c.reset();
    c.inc(15);
    c.inc({ code: 200 }, Math.random());
    c.labels("200").inc(Math.random());
  }, 5000);

  // cluster
  if (cluster.isWorker) {
    setInterval(() => {
      c.inc({ code: `worker_${cluster.worker?.id}` });
    }, 2000);
  }

  register.registerMetric(c);
  register.registerMetric(sc);
};
