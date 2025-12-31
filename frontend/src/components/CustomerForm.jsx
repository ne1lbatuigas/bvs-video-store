import { useEffect, useState } from "react";
import { createCustomer, updateCustomer } from "../services/customerService";

function CustomerForm({
  selectedCustomer,
  onCustomerAdded,
  clearSelection,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Populate fields when editing
  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.fullName);
      setPhone(selectedCustomer.contactNumber);
    } else {
      setName("");
      setPhone("");
    }
  }, [selectedCustomer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCustomer) {
      await updateCustomer(selectedCustomer._id, {
        fullName: name,
        contactNumber: phone,
      });
    } else {
      await createCustomer({
        fullName: name,
        contactNumber: phone,
      });
    }

    onCustomerAdded();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{selectedCustomer ? "Edit Customer" : "Add Customer"}</h3>

      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit">
          {selectedCustomer ? "Update Customer" : "Add Customer"}
        </button>

        <button type="button" onClick={clearSelection}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;