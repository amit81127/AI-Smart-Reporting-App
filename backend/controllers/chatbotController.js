const { askAI } = require("../services/chatbotService");

exports.chatbot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await askAI(message);
    console.log('AI Reply:', reply);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
