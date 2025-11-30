import { useEffect, useState } from "react";
import { API } from "./api";

export default function EmployeeDetails({ id, goBack }) {
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    fetch(`${API}/employees/${id}`)
      .then(r => r.json())
      .then(setEmp);
  }, [id]);

  if (!emp) return "Loading…";

  return (
    <div style={{ padding: 20, background: "#fff" }}>
      <button onClick={goBack}>← Back</button>

      <h2>{emp.firstName} {emp.lastName}</h2>
      <p>Email: {emp.email}</p>
      <p>Department: {emp.department?.name}</p>
      <p>Position: {emp.position}</p>
      <p>Salary: {emp.salary}</p>
      <p>Hire date: {new Date(emp.hireDate).toLocaleDateString()}</p>

      <h3>Compensation</h3>
      <ul>
        {emp.compensation.map(c => (
          <li key={c.id}>{new Date(c.date).toLocaleDateString()} — €{c.amount}</li>
        ))}
      </ul>

      <h3>Reviews</h3>
      <ul>
        {emp.reviews.map(r => (
          <li key={r.id}>
            {new Date(r.date).toLocaleDateString()} — score {r.score} — {r.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
