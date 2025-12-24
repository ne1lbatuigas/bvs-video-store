const Customer = require("../models/Customer");

// CREATE customer
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, contactNumber } = req.body;

    if (!fullName || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const customer = await Customer.create({ fullName, contactNumber });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ fullName: 1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};