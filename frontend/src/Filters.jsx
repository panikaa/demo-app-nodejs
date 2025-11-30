import { useEffect, useState } from "react";

export default function Filters({ setFilters }) {
  const [state, setState] = useState({
    search: "",
    email: "",
    department: "",
    position: "",
    minSalary: "",
    maxSalary: "",
    skill: "",
    hireAfter: "",
    hireBefore: "",
    sortBy: "lastName",
    sortDir: "asc"
  });

  function apply() {
    setFilters(state);
  }

  return (
    <div style={{ padding: 20, background: "#fff", marginBottom: 20, borderRadius: 8 }}>
      <h3>Filters</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        <input placeholder="Search name…" value={state.search}
          onChange={e => setState({ ...state, search: e.target.value })} />

        <input placeholder="Email…" value={state.email}
          onChange={e => setState({ ...state, email: e.target.value })} />

        <input placeholder="Department…" value={state.department}
          onChange={e => setState({ ...state, department: e.target.value })} />

        <input placeholder="Position…" value={state.position}
          onChange={e => setState({ ...state, position: e.target.value })} />

        <input placeholder="Min salary" type="number" value={state.minSalary}
          onChange={e => setState({ ...state, minSalary: e.target.value })} />

        <input placeholder="Max salary" type="number" value={state.maxSalary}
          onChange={e => setState({ ...state, maxSalary: e.target.value })} />

        <input placeholder="Skill…" value={state.skill}
          onChange={e => setState({ ...state, skill: e.target.value })} />

        <input type="date" value={state.hireAfter}
          onChange={e => setState({ ...state, hireAfter: e.target.value })} />

        <input type="date" value={state.hireBefore}
          onChange={e => setState({ ...state, hireBefore: e.target.value })} />

        <select value={state.sortBy}
          onChange={e => setState({ ...state, sortBy: e.target.value })}>
          <option value="lastName">Last name</option>
          <option value="firstName">First name</option>
          <option value="hireDate">Hire date</option>
          <option value="salary">Salary</option>
        </select>

        <select value={state.sortDir}
          onChange={e => setState({ ...state, sortDir: e.target.value })}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      <button onClick={apply} style={{ marginTop: 15 }}>Apply filters</button>
    </div>
  );
}
