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

      {rentals
        .map((rental) => (
          <div key={rental._id} className="card">
            <h3>{rental.video.title}</h3>

            <p>Customer: {rental.customer?.fullName}</p>
            <p>Due: {new Date(rental.dueDate).toLocaleDateString()}</p>
            <p>Status: {rental.status}</p>

            {/* Show return button ONLY if still rented */}
            {rental.status === "RENTED" && (
              <button onClick={() => handleReturn(rental._id)}>
                Return Video
              </button>
            )}

            {/* Penalty logic */}
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