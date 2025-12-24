const express = require("express");
const {
  videoInventoryReport,
  customerRentalReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/videos", videoInventoryReport);
router.get("/customers", customerRentalReport);

module.exports = router;
