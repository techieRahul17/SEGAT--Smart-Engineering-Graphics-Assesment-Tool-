import { onRequest } from "firebase-functions/v2/https";

// Basic Firebase function that responds with a message
export const basicResponseFunction = onRequest(async (req, res) => {
    console.log("Request body:", req.body); // Log the request body

    try {
        const userMessage = req.body.message; // Access the user message

        // Check if the message is received correctly
        if (!userMessage) {
            return res.status(400).send({ error: "No message provided" });
        }

        // Example response - you can replace this with your AI logic
        const responseMessage = `AI response for: ${userMessage}`;
        console.log("Response message:", responseMessage); // Log the response

        res.status(200).send({ output: responseMessage });
    } catch (error) {
        console.error("Error processing the request:", error);
        res.status(500).send({ error: "Error processing the request" });
    }
});
