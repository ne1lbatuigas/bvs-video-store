const Video = require("../models/Video");

// CREATE video
exports.createVideo = async (req, res) => {
  try {
    const { title, category, totalCopies, maxRentDays } = req.body;

    if (!title || !category || !totalCopies || !maxRentDays) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["VCD", "DVD"].includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (maxRentDays < 1 || maxRentDays > 3) {
      return res
        .status(400)
        .json({ message: "Rent days must be 1 to 3 only" });
    }

    if (totalCopies < 1) {
      return res
        .status(400)
        .json({ message: "Total copies must be at least 1" });
    }

    const rentPrice = category === "VCD" ? 25 : 50;

    const video = await Video.create({
      title,
      category,
      totalCopies,
      rentPrice,
      maxRentDays,
    });

    res.status(201).json(video);
  } catch (error) {
    console.error(error); // 👈 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};

// GET all videos (alphabetical)
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ title: 1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE video
exports.updateVideo = async (req, res) => {
  try {
    const { category, maxRentDays } = req.body;

    if (category && !["VCD", "DVD"].includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (maxRentDays && (maxRentDays < 1 || maxRentDays > 3)) {
      return res.status(400).json({ message: "Rent days must be 1 to 3 only" });
    }

    if (category) {
      req.body.rentPrice = category === "VCD" ? 25 : 50;
    }

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};