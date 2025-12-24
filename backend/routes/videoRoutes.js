const express = require("express");
const {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

const router = express.Router();

router.post("/", createVideo);
router.get("/", getVideos);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

module.exports = router;
