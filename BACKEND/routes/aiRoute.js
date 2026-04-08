const express = require("express");
const router = express.Router();
const { handleAI } = require("../controllers/aiController");

router.post("/ask", handleAI);

module.exports = router;