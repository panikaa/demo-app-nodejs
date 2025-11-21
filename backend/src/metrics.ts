import express from "express";
import client from "prom-client";

export const register = new client.Registry();
export const metricsRouter = express.Router();

// Default system metrics (CPU, RAM)
client.collectDefaultMetrics({ register });

// Custom metric: request counter
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["path"]
});

register.registerMetric(httpRequests);

// Middleware: count requests
metricsRouter.use((req, _res, next) => {
  httpRequests.labels(req.path).inc();
  next();
});

// Expose /metrics
metricsRouter.get("/", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
