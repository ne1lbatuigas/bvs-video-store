import { useEffect, useState } from "react";
import RentalForm from "../components/RentalForm";
import { getRentals, returnRental } from "../services/rentalService";

function RentalList() {
  const [rentals, setRentals] = useState([]);

  const loadRentals = async () => {
    const data = await getRentals();
    setRentals(data);
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const handleReturn = async (id) => {
    await returnRental(id);
    loadRentals();
  };

  return (
    <>
      <RentalForm onRentalCreated={loadRentals} />

      <h2>Active Rentals</h2>

      {/* EMPTY STATE */}
      {rentals.length === 0 && (
        <p className="empty">No rentals yet.</p>
      )}

      {rentals.map((rental) => (
        <div key={rental._id} className="card rental">
          
          {/* HEADER: title + status */}
          <div className="rental-header">
            <h3>{rental.video.title}</h3>

            <span
              className={`badge ${
                rental.status === "RETURNED"
                  ? "badge-success"
                  : "badge-warning"
              }`}
            >
              {rental.status}
            </span>
          </div>

          <p>
            <strong>Customer:</strong>{" "}
            {rental.customer?.fullName || "Unknown"}
          </p>

          <p>
            <strong>Due:</strong>{" "}
            {new Date(rental.dueDate).toLocaleDateString()}
          </p>

          {/* RETURN BUTTON */}
          {rental.status === "RENTED" && (
            <button onClick={() => handleReturn(rental._id)}>
              Return Video
            </button>
          )}

          {/* PENALTY DISPLAY */}
          {rental.penalty > 0 ? (
            <span className="badge badge-error">
              ₱{rental.penalty} Late Fee
            </span>
          ) : rental.status === "RETURNED" ? (
            <span className="badge badge-success">On Time</span>
          ) : null}
        </div>
      ))}
    </>
  );
}

export default RentalList;
