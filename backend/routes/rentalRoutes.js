const express = require("express");
const { rentVideo, returnVideo } = require("../controllers/rentalController");

const router = express.Router();

router.post("/rent", rentVideo);
router.put("/return/:id", returnVideo);

module.exports = router;
