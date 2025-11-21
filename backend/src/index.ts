import express from "express";
import { employeesRouter } from "./routes/employees";
import { systemRouter } from "./routes/system";
import { metricsRouter } from "./metrics";
import { generateInitialData } from "./workers/feedGenerator";
import { startSyncWorker } from "./workers/syncWorker";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/employees", employeesRouter);
app.use("/api/system", systemRouter);
app.use("/api/metrics", metricsRouter);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

generateInitialData().then(() => {
  startSyncWorker();
  app.listen(port, () => console.log("API running on port", port));
});
