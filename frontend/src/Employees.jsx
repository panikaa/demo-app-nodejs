import { useEffect, useState } from "react";
import EmployeeDetails from "./EmployeeDetails";

export default function Employees() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`/employees?page=${page}`)
      .then(r => r.json())
      .then(data => setList(data));
  }, [page]);

  const filtered = list.filter(e =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  if (selected)
    return <EmployeeDetails id={selected} goBack={() => setSelected(null)} />;

  return (
    <div style={styles.card}>
      <h2>Employees</h2>

      <input
        placeholder="Search by name…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.search}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Salary (€)</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(e => (
            <tr key={e.id} onClick={() => setSelected(e.id)} style={styles.row}>
              <td>{e.firstName} {e.lastName}</td>
              <td>{e.department?.name}</td>
              <td>{e.salary}</td>
              <td>{e.position}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage(p => p + 1)}>Load more</button>
    </div>
  );
}

const styles = {
  card: {
    padding: 20,
    marginBottom: 20,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10
  },
  row: {
    cursor: "pointer",
    borderBottom: "1px solid #ddd"
  },
  search: {
    padding: 8,
    marginBottom: 10,
    width: "100%"
  }
};
