const Video = require("../models/Video");
const Rental = require("../models/Rental");

// VIDEO REPORT
exports.videoInventoryReport = async (req, res) => {
  try {
    const videos = await Video.find().sort({ title: 1 });

    const report = videos.map((video) => ({
      title: video.title,
      category: video.category,
      in: video.totalCopies - video.rentedCopies,
      out: video.rentedCopies,
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { Parser } = require("json2csv");

exports.videoInventoryReportCSV = async (req, res) => {
  const videos = await Video.find().sort({ title: 1 });

  const data = videos.map((video) => ({
    Title: video.title,
    Category: video.category,
    In: video.totalCopies - video.rentedCopies,
    Out: video.rentedCopies,
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("video_inventory_report.csv");
  res.send(csv);
};

// CUSTOMER RENTAL REPORT
exports.customerRentalReport = async (req, res) => {
  try {
    const rentals = await Rental.find({ status: "RENTED" })
      .populate("customer", "fullName")
      .populate("video", "title");

    const report = rentals.map((rental) => ({
      customer: rental.customer.fullName,
      video: rental.video.title,
      dueDate: rental.dueDate,
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.customerRentalReportCSV = async (req, res) => {
  const rentals = await Rental.find({ status: "RENTED" })
    .populate("customer", "fullName")
    .populate("video", "title");

  const data = rentals.map((rental) => ({
    Customer: rental.customer.fullName,
    Video: rental.video.title,
    DueDate: rental.dueDate.toLocaleDateString(),
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("customer_rental_report.csv");
  res.send(csv);
};

// RENTAL HISTORY REPORT
exports.rentalHistoryReport = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("customer", "fullName")
      .populate("video", "title rentPrice")
      .sort({ createdAt: -1 });

    const report = rentals.map((r) => ({
      customer: r.customer?.fullName || "Unknown",
      video: r.video?.title || "Unknown",
      rentDate: r.createdAt,
      dueDate: r.dueDate,
      returnDate: r.returnDate || null,
      penalty: r.penalty || 0,
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CSV
exports.rentalHistoryReportCSV = async (req, res) => {
  const rentals = await Rental.find()
    .populate("customer", "fullName")
    .populate("video", "title rentPrice")
    .sort({ createdAt: -1 });

  const data = rentals.map((r) => ({
    Customer: r.customer?.fullName || "Unknown",
    Video: r.video?.title || "Unknown",
    RentDate: r.createdAt.toLocaleDateString(),
    DueDate: r.dueDate.toLocaleDateString(),
    ReturnDate: r.returnDate
      ? r.returnDate.toLocaleDateString()
      : "Not Returned",
    Penalty: r.penalty,
  }));

  const { Parser } = require("json2csv");
  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("rental_history_report.csv");
  res.send(csv);
};

