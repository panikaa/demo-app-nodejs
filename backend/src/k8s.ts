import fs from "fs";

export function getKubernetesStatus() {
  const isInKubernetes = fs.existsSync("/var/run/secrets/kubernetes.io");

  if (!isInKubernetes) {
    return {
      runningInKubernetes: false
    };
  }

  // Things we can detect:
  const podName = process.env.HOSTNAME || null;
  const namespace = getFile("/var/run/secrets/kubernetes.io/serviceaccount/namespace");
  const serviceAccount = process.env.KUBERNETES_SERVICE_ACCOUNT || null;
  const kubeHost = process.env.KUBERNETES_SERVICE_HOST || null;

  return {
    runningInKubernetes: true,
    podName,
    namespace,
    serviceAccount,
    apiServer: kubeHost
  };
}

function getFile(path: string): string | null {
  try {
    return fs.readFileSync(path).toString().trim();
  } catch {
    return null;
  }
}
