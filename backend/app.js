const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 THIS LINE IS REQUIRED
app.use(express.json());

// optional but good
app.use(cors());

const videoRoutes = require("./routes/videoRoutes");
const customerRoutes = require("./routes/customerRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/videos", videoRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("BVS API is running...");
});

module.exports = app;