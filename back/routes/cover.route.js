const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  generateCoverLetterController,
} = require("../controllers/cover.controller");


router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://5173");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"), false);
    } else {
      cb(null, true);
    }
  }
});

router.post(
  "/generate-cover-letter",
  upload.single("resume"),
  generateCoverLetterController
);

module.exports = router;