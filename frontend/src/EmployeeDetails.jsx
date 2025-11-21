import { useEffect, useState } from "react";

export default function EmployeeDetails({ id, goBack }) {
  const [emp, setEmp] = useState(null);

  const load = () =>
    fetch(`/employees/${id}`).then(r => r.json()).then(setEmp);

  useEffect(() => {
    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, [id]);

  if (!emp) return "Loading…";

  return (
    <div style={styles.card}>
      <button onClick={goBack} style={styles.back}>← Back</button>

      <h2>{emp.firstName} {emp.lastName}</h2>

      <p><b>Department:</b> {emp.department?.name}</p>
      <p><b>Position:</b> {emp.position}</p>
      <p><b>Salary:</b> €{emp.salary}</p>
      <p><b>Skills:</b> {emp.skills.join(", ")}</p>

      <h3>Recent Compensation</h3>
      <ul>
        {emp.compensation.map(c => (
          <li key={c.id}>
            {new Date(c.date).toLocaleDateString()} — €{c.amount}
          </li>
        ))}
      </ul>

      <h3>Performance Reviews</h3>
      <ul>
        {emp.reviews.length === 0 ? (
          <li>No reviews yet</li>
        ) : emp.reviews.map(r => (
          <li key={r.id}>
            {r.date.substring(0, 10)} – Score {r.score}/10  
            <br />“{r.comment}”
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  card: {
    padding: 20,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  back: {
    marginBottom: 10
  }
};
