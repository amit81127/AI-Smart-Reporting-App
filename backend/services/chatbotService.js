const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askAI(message) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `You are the Smart Campus AI Assistant. 
    A student or staff member is asking: "${message}"
    
    Please provide a helpful, concise, and professional response regarding campus issues like electricity, water, security, or general campus information. 
    If they are reporting an issue, encourage them to use the "Report Issue" section of the app.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Error:", error.message);
    if (error.message.includes("API_KEY_INVALID")) {
        return "ERROR: Secret Gemini API Key is invalid. Please check your .env file.";
    }
    return "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
  }
}

module.exports = { askAI };
