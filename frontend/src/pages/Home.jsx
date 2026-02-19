import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h1 className="mb-3">Buyer Management System</h1>

        <p className="mb-4 text-muted">
          Upload, manage and track buyer invoice data securely.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-primary px-4">
            Sign In
          </Link>

          <Link to="/signup" className="btn btn-outline-dark px-4">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
