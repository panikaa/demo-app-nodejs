import express from "express";
import os from "os";
import { getKubernetesStatus } from "./k8s";

export const router = express.Router();

router.get("/info", (_req, res) => {
  res.json({
    app: "demo-app",
    version: process.env.APP_VERSION || "dev",
    hostname: os.hostname(),
    environment: process.env.APP_ENV || "local",
    kubernetes: getKubernetesStatus()
  });
});

router.get("/users", (_req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
  ]);
});
