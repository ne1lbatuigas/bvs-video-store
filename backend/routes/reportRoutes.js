const express = require("express");
const {
  videoInventoryReport,
  customerRentalReport,
  videoInventoryReportCSV,
  customerRentalReportCSV,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/videos", videoInventoryReport);
router.get("/videos/csv", videoInventoryReportCSV);

router.get("/customers", customerRentalReport);
router.get("/customers/csv", customerRentalReportCSV);

module.exports = router;