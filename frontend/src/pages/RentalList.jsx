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
        .filter(rental => rental.status !== "RETURNED")
        .map((rental) => (
          <div key={rental._id} className="card">
            <h3>{rental.video.title}</h3>
            <p>Customer: {rental.customer.fullName}</p>
            <p>Days Rented: {rental.days}</p>
            <p>Due: {new Date(rental.dueDate).toLocaleDateString()}</p>

            {!rental.returned && (
              <button onClick={() => handleReturn(rental._id)}>
                Return Video
              </button>
            )}
          </div>
        ))}
    </>
  );
}

export default RentalList;