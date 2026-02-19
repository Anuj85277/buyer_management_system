import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <Link to="/upload" className="btn btn-primary m-2">Upload Buyers</Link>
      <Link to="/buyers" className="btn btn-secondary m-2">View Buyers</Link>
      <button
        className="btn btn-danger m-2"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
