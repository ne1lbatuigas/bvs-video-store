import { useState } from "react";
import { createCustomer } from "../services/customerService";

function CustomerForm({ onCustomerAdded }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createCustomer({
      fullName: name,
      contactNumber: phone,
    });

    setName("");
    setPhone("");
    onCustomerAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Customer</h3>

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

      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerForm;
