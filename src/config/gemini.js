/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

/*import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};*/

// Helper function to check if the prompt is related to engineering graphics
function isEngineeringGraphicsRelated(prompt) {
  const keywords = [
    "engineering graphics",
    "drawing",
    "projection",
    "orthographic",
    "isometric",
    "sectional view",
    "CAD",
    "geometry",
    "solid",
    "diagram"
  ];

  return keywords.some((keyword) => prompt.toLowerCase().includes(keyword));
}

// Modify the run function to include the role clarification and logic for engineering graphics problems
async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  // Check if the prompt is related to engineering graphics
  if (!isEngineeringGraphicsRelated(prompt)) {
    const response = "My role is to help you solve engineering graphics problems. Please enter a question related to engineering graphics.";
    console.log(response);
    return response;
  }

  // If prompt is relevant, proceed to generate the response
  const result = await chatSession.sendMessage(prompt);
  let response = result.response.text();

  // Process the response to highlight steps and headings
  let responseArray = response.split("\n"); // Assume steps are in separate lines
  let formattedResponse = "";

  // Loop through each line of the response
  responseArray.forEach((line) => {
    if (line.toLowerCase().includes("step") || line.toLowerCase().includes("algorithm")) {
      // Highlight the line if it contains "Step" or "Algorithm"
      formattedResponse += `<strong>${line}</strong><br/>`;
    } else {
      formattedResponse += `${line}<br/>`;
    }
  });

  console.log(formattedResponse); // Log the formatted response for debugging
  return formattedResponse;
}

export default run;