const Rental = require("../models/Rental");
const Video = require("../models/Video");
const mongoose = require("mongoose");

// RENT video
exports.rentVideo = async (req, res) => {
  try {
    const { customerId, videoId, days } = req.body;

    if (!customerId || !videoId || !days) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ ObjectId validation (NOW videoId exists)
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    if (days < 1 || days > 3) {
      return res.status(400).json({ message: "Rent days must be 1 to 3 only" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const available = video.totalCopies - video.rentedCopies;

    if (available <= 0) {
      return res
        .status(400)
        .json({ message: "No available copies for rent" });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    const rental = await Rental.create({
      customer: customerId,
      video: videoId,
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
    let penalty = 0;

    if (returnDate > rental.dueDate) {
      const diffTime = returnDate - rental.dueDate;
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
