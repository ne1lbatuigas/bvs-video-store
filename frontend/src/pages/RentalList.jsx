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

  // ✅ Active rentals only
  const activeRentals = rentals.filter(
    (rental) => rental.status === "RENTED"
  );

  // 🔁 used for correct overdue calculation
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <RentalForm onRentalCreated={loadRentals} />

      <h2>Active Rentals</h2>

      {activeRentals.length === 0 && (
        <p className="empty">No active rentals.</p>
      )}

      {activeRentals.length > 0 && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>VIDEO</th>
                <th>RENTAL DATE</th>
                <th>DUE DATE</th>
                <th>FEE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {activeRentals.map((rental) => {
                const due = new Date(rental.dueDate);
                due.setHours(0, 0, 0, 0);

                const isOverdue = today > due;

                const daysLate = isOverdue
                  ? Math.floor(
                      (today - due) / (1000 * 60 * 60 * 24)
                    )
                  : 0;

                const baseFee =
                  rental.video?.rentPrice || 0;

                const lateFee =
                  daysLate * (rental.penaltyPerDay || 5);

                return (
                  <tr key={rental._id}>
                    <td>{rental.customer?.fullName || "Unknown"}</td>

                    <td>{rental.video?.title}</td>

                    <td>
                      {new Date(
                        rental.rentDate
                      ).toLocaleDateString()}
                    </td>

                    <td
                      style={{
                        color: isOverdue ? "#dc2626" : "inherit",
                        fontWeight: isOverdue ? 600 : "normal",
                      }}
                    >
                      {due.toLocaleDateString()}
                    </td>

                    <td>
                      ₱{baseFee}
                      {lateFee > 0 && (
                        <span
                          style={{
                            color: "#dc2626",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          + ₱{lateFee}
                        </span>
                      )}
                    </td>

                    <td>
                      {isOverdue ? (
                        <span className="badge badge-error">
                          {daysLate} day
                          {daysLate > 1 && "s"} overdue
                        </span>
                      ) : (
                        <span className="badge badge-success">
                          On Time
                        </span>
                      )}
                    </td>

                    <td className="actions">
                      <button
                        className="icon-btn edit"
                        title="Return"
                        onClick={() => handleReturn(rental._id)}
                      >
                        ⟲ Return
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default RentalList;