// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Groq = require("groq-sdk");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getAIResponse = async (prompt) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;

//     return response.text();

//   } catch (error) {
//     console.error(error);
//     throw new Error("Gemini API Error");
//   }
// };


const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getAIResponse = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      // Llama 3.3 70B is powerful and free on Groq
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || "";

  } catch (error) {
    console.error("Groq API Error:", error.message);
    
    // If Groq also hits a limit, you can still keep your 
    // retry logic or fallback to another service here.
    throw new Error("AI Service Error");
  }
};

module.exports = getAIResponse;


// exports.getAIResponseWithRetry = async(prompt, retries = 3) => {
//   try {
//     return await getAIResponse(prompt);
//   } catch (err) {
//     if (retries > 0 && err.status === 503) {
//       console.log("Retrying AI request...");
//       await new Promise(r => setTimeout(r, 2000)); // wait 2 sec
//       return getAIResponseWithRetry(prompt, retries - 1);
//     }
//     throw err;
//   }
// }





// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getAIResponse = async (prompt, retries = 3, delay = 2000) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();

//   } catch (error) {
//     // Check if error is a 503 (Service Unavailable) or 429 (Rate Limit)
//     if (retries > 0 && (error.status === 503 || error.status === 429)) {
//       console.warn(`Gemini busy. Retrying in ${delay}ms... (${retries} left)`);
      
//       // Wait before retrying
//       await new Promise(res => setTimeout(res, delay));
      
//       // Retry with double the delay (Exponential Backoff)
//       return getAIResponse(prompt, retries - 1, delay * 2);
//     }

//     console.error("Gemini Final Error:", error.message);
    
//     // Optional: Call a fallback function here
//     // return getGroqResponse(prompt); 
    
//     throw new Error("AI Service temporarily unavailable. Please try again later.");
//   }
// };


module.exports = getAIResponse;