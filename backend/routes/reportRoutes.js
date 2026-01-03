const express = require("express");
const {
  videoInventoryReport,
  videoInventoryReportCSV,
  customerRentalReport,
  customerRentalReportCSV,
  rentalHistoryReport,
  rentalHistoryReportCSV,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/videos", videoInventoryReport);
router.get("/videos/csv", videoInventoryReportCSV);

router.get("/customers", customerRentalReport);
router.get("/customers/csv", customerRentalReportCSV);

// ✅ NEW
router.get("/history", rentalHistoryReport);
router.get("/history/csv", rentalHistoryReportCSV);

module.exports = router;
