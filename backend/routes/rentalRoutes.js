const express = require("express");
const {
  rentVideo,
  returnVideo,
  getRentals,
} = require("../controllers/rentalController");

const router = express.Router();

// GET /api/rentals
router.get("/", getRentals);

// POST /api/rentals
router.post("/", rentVideo);

// PUT /api/rentals/:id/return
router.put("/:id/return", returnVideo);

module.exports = router;
