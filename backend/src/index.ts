import express from "express";
import os from "os";
import { router } from "./routes";
import { metricsRouter, register } from "./metrics";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/", router);
app.use("/metrics", metricsRouter);

// Healthcheck for Kubernetes
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`API running on port ${port}, hostname: ${os.hostname()}`);
});
