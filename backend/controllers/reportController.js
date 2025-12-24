const Video = require("../models/Video");
const Rental = require("../models/Rental");

// VIDEO REPORT
exports.videoInventoryReport = async (req, res) => {
  try {
    const videos = await Video.find().sort({ title: 1 });

    const report = videos.map((video) => ({
      title: video.title,
      totalCopies: video.totalCopies,
      rentedOut: video.rentedCopies,
      available: video.totalCopies - video.rentedCopies,
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
