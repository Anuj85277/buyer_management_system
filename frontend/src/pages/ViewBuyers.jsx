import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ViewBuyers() {
  const [buyers, setBuyers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBuyers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/buyers?page=${page}&limit=${limit}&search=${search}`
      );

      setBuyers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Error fetching buyers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBuyers();
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Buyer Records</h3>

      {/* Search Bar */}
      <form className="mb-3 d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by Name, Email or Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Invoice</th>
              <th>Paid</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : buyers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No records found
                </td>
              </tr>
            ) : (
              buyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.mobile}</td>
                  <td>{buyer.address}</td>
                  <td>{buyer.total_invoice_amount}</td>
                  <td>{buyer.total_amount_paid}</td>
                  <td>{buyer.total_amount_due}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Back Button */}
      <div className="mt-4">
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ViewBuyers;
