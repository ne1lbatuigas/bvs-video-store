const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["VCD", "DVD"],
      required: true,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1,
    },
    rentedCopies: {
      type: Number,
      default: 0,
      min: 0,
    },
    rentPrice: {
      type: Number,
      required: true,
      enum: [25, 50],
    },
    maxRentDays: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
