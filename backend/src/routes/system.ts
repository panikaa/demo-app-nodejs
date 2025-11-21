import express from "express";
import os from "os";
import { getKubernetesStatus } from "../k8s";

export const systemRouter = express.Router();

systemRouter.get("/", (req, res) => {
  res.json({
    app: "hcm-system",
    version: process.env.APP_VERSION || "dev",
    hostname: os.hostname(),
    environment: process.env.APP_ENV || "local",
    kubernetes: getKubernetesStatus()
  });
});
