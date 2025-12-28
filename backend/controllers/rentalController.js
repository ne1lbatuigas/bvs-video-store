const Rental = require("../models/Rental");
const Video = require("../models/Video");
const mongoose = require("mongoose");

// GET all rentals
exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("customer")
      .populate("video");

    res.json(rentals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// RENT video
exports.rentVideo = async (req, res) => {
  try {
    const { customerId, videoId, days } = req.body;

    if (!customerId || !videoId || !days) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ObjectId validation (NOW videoId exists)
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    if (days < 1) {
      return res.status(400).json({ message: "Rent days must be at least 1 day" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (days > video.maxRentDays) {
      return res.status(400).json({
        message: `This video can only be rented for up to ${video.maxRentDays} day(s)`
      });
    }

    const available = video.totalCopies - video.rentedCopies;

    if (available <= 0) {
      return res
        .status(400)
        .json({ message: "No available copies for rent" });
    }

    const rentDate = new Date();

    const dueDate = new Date(rentDate);
    dueDate.setUTCDate(dueDate.getUTCDate() + Number(days));

    const rental = await Rental.create({
      customer: customerId,
      video: videoId,
      rentDate,
      dueDate,
    });

    video.rentedCopies += 1;
    await video.save();

    res.status(201).json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// RETURN video
exports.returnVideo = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid rental ID" });
  }
  try {
    const rental = await Rental.findById(req.params.id).populate("video");

    if (!rental || rental.status === "RETURNED") {
      return res.status(404).json({ message: "Rental not found or already returned" });
    }

    const returnDate = new Date();

    const dueDate = new Date(rental.dueDate);
    dueDate.setHours(23, 59, 59, 999); // allow whole due day

    let penalty = 0;

    if (returnDate > dueDate) {
      const diffTime = returnDate - dueDate;
      const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      penalty = overdueDays * 5;
    }

    rental.returnDate = returnDate;
    rental.penalty = penalty;
    rental.status = "RETURNED";
    await rental.save();

    rental.video.rentedCopies -= 1;
    await rental.video.save();

    res.json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
