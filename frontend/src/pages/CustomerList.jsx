import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    await deleteCustomer(id);
    loadCustomers();
  };

  return (
    <>
      <CustomerForm onCustomerAdded={loadCustomers} />

      <h2>Customers</h2>

      {customers.map((customer) => (
        <div key={customer._id} className="card">
          <h3>{customer.fullName}</h3>
          <p>📞 {customer.contactNumber}</p>

          <button onClick={() => handleDelete(customer._id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default CustomerList;
