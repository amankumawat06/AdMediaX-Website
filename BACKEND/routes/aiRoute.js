const express = require("express");
const router = express.Router();

const { handleAI } = require("../controllers/aiController");

router.post("/chat", handleAI);

module.exports = router;
