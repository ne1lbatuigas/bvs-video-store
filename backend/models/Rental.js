const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    rentDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: Date,
    penalty: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["RENTED", "RETURNED"],
      default: "RENTED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rental", rentalSchema);
