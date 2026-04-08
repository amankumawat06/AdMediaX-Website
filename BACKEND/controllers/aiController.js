const services = require("../config/services");
const generatePrompt = require("../prompts/recommendation");
const getAIResponse = require("../services/aiService");

exports.handleAI = async (req, res) => {
  try {
    const { query, goal, businessType, budget, platform } = req.body;

    if (!query || !goal || !businessType || !budget || !platform) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = generatePrompt(
      { query, goal, businessType, budget, platform },
      services,
    );

    const aiResult = await getAIResponse(prompt);

    let message = "";
    let selectedServices = [];

    try {
      const lines = aiResult.split("\n");

      const messageLine = lines.find((line) => line.startsWith("MESSAGE:"));
      const servicesLine = lines.find((line) => line.startsWith("SERVICES:"));

      if (messageLine) {
        message = messageLine.replace("MESSAGE:", "").trim();
      }

      if (servicesLine) {
        selectedServices = servicesLine
          .replace("SERVICES:", "")
          .split(",")
          .map((s) => s.trim());
      }
    } catch (err) {
      console.log("Parsing error:", err);
    }

    const matchedServices = services.filter((service) =>
      selectedServices.includes(service.name),
    );

    res.json({
      message,
      services: matchedServices,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal server error!, Failed to responed to your query",
    });
  }
};
