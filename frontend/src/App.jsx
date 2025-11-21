import Dashboard from "./Dashboard";
import Employees from "./Employees";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>HCM Management System</h1>

      <Dashboard />
      <Employees />
    </div>
  );
}
