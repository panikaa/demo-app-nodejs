import { useEffect, useState } from "react";
import Filters from "./Filters";
import EmployeeDetails from "./EmployeeDetails";
import { API } from "./api.js";

export default function Employees() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState(null);

  function buildQuery() {
    const params = new URLSearchParams({ page });
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    return params.toString();
  }

  useEffect(() => {
    fetch(`${API}/employees?${buildQuery()}`)
      .then(r => r.json())
      .then(setList);
  }, [page, filters]);

  if (selected)
    return <EmployeeDetails id={selected} goBack={() => setSelected(null)} />;

  return (
    <div>
      <Filters setFilters={setFilters} />

      <div style={styles.card}>
        <h2>Employees</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Hire date</th>
            </tr>
          </thead>

          <tbody>
            {list.map(e => (
              <tr key={e.id} style={styles.row} onClick={() => setSelected(e.id)}>
                <td>{e.firstName} {e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.department?.name}</td>
                <td>{e.position}</td>
                <td>{e.salary}</td>
                <td>{new Date(e.hireDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setPage(p => p + 1)}>Load more</button>
      </div>
    </div>
  );
}

const styles = {
  card: { padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  table: { width: "100%", marginTop: 10, borderCollapse: "collapse" },
  row: { cursor: "pointer", borderBottom: "1px solid #ddd", height: 40 }
};
