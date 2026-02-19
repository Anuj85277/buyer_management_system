const express = require("express");
const router = express.Router();
const { uploadBuyers, getBuyers } = require("../controllers/buyerController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/upload", verifyToken, upload.single("file"), uploadBuyers);
router.get("/", verifyToken, getBuyers);

module.exports = router;
