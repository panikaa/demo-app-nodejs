import { useEffect, useState } from "react";
import { API } from "./api.js";

export default function Dashboard() {
  const [system, setSystem] = useState(null);

  useEffect(() => {
    fetch(`${API}/system`)
      .then(r => r.json())
      .then(setSystem);
  }, []);

  if (!system) return <div>Loading system info…</div>;

  const k8s = system.kubernetes;

  return (
    <div style={styles.card}>
      <h2>System Status</h2>

      <p><b>App Version:</b> {system.version}</p>
      <p><b>Environment:</b> {system.environment}</p>
      <p><b>Hostname:</b> {system.hostname}</p>

      <h3>Kubernetes</h3>
      {k8s.runningInKubernetes ? (
        <>
          <p><b>Pod:</b> {k8s.podName}</p>
          <p><b>Namespace:</b> {k8s.namespace}</p>
          <p><b>API Server:</b> {k8s.apiServer}</p>
        </>
      ) : (
        <p>Running outside Kubernetes</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: 20,
    marginBottom: 20,
    background: "#f4f4f4",
    borderRadius: 8
  }
};
