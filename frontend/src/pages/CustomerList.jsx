import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { FiPhone } from "react-icons/fi";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await deleteCustomer(id);
    loadCustomers();
  };

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <h2 className="page-title">Customer Library</h2>

        <button
          className="btn-primary"
          onClick={() => {
            setSelectedCustomer(null);
            setShowModal(true);
          }}
        >
          <FaPlus />
          <span> Add Customer</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <CustomerForm
              selectedCustomer={selectedCustomer}
              onCustomerAdded={() => {
                loadCustomers();
                setShowModal(false);
              }}
              clearSelection={() => {
                setSelectedCustomer(null);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Table */}
      {customers.length === 0 ? (
        <p className="empty">No customers found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CONTACT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.fullName}</td>

                <td>
                  <span className="customer-phone">
                    <FiPhone />
                    {customer.contactNumber}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className="icon-btn edit"
                    title="Edit Customer"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete"
                    title="Delete Customer"
                    onClick={() => handleDelete(customer._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CustomerList;
