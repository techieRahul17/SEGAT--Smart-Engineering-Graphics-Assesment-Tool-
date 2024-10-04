import { createContext, useState } from "react";
import { db, myFunction, storage } from "../firebase"; // Import Firestore and Storage
import { collection, addDoc, getDocs } from "firebase/firestore"; // Import Firestore methods
import { ref, uploadBytes } from "firebase/storage"; // Import Storage methods
import Tesseract from "tesseract.js"; // Import Tesseract.js for OCR

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState(""); // Input text or image OCR result
    const [recentPrompt, setRecentPrompt] = useState(""); // Recently sent prompt
    const [prevPrompt, setPrevPrompt] = useState([]); // List of previous prompts
    const [showResult, setShowResult] = useState(false); // Control result visibility
    const [loading, setLoading] = useState(false); // Loading state
    const [resultData, setResultData] = useState({ svg: null, answer: null }); // Result data containing SVG and answer

    // Save prompt to Firestore
    const savePrompt = async (prompt) => {
        try {
            await addDoc(collection(db, "prompts"), {
                prompt: prompt,
                timestamp: new Date(),
            });
            console.log("Prompt saved to Firestore!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Load previous prompts from Firestore
    const loadPreviousPrompts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "prompts"));
            const prompts = [];
            querySnapshot.forEach((doc) => {
                prompts.push(doc.data().prompt);
            });
            setPrevPrompt(prompts);
        } catch (e) {
            console.error("Error loading previous prompts: ", e);
        }
    };

    // Handle image upload and OCR
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageRef = ref(storage, `images/${file.name}`);

            try {
                // Upload image to Firebase Storage
                await uploadBytes(imageRef, file);
                console.log("Image uploaded successfully!");

                // Recognize text from the uploaded image using Tesseract
                const { data: { text } } = await Tesseract.recognize(
                    file,
                    'eng',
                    { logger: info => console.log(info) } // Log progress
                );

                setInput(text); // Set recognized text as input
                onSent(text); // Send the recognized text as a prompt

            } catch (error) {
                console.error("Error uploading image or processing text: ", error);
            }
        }
    };

    // Create a new chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData({ svg: null, answer: null });
    };

    // Delay function for displaying answers progressively
    const delayPara = (index, word) => {
        setTimeout(() => {
            setResultData((prev) => ({
                ...prev,
                answer: (prev.answer || "") + word
            }));
        }, 10 * index); // 10 ms delay for each word
    };

    // Handle sending prompt to backend and processing the response
    const onSent = async (prompt) => {
        setResultData({ svg: null, answer: null });
        setLoading(true);
        setShowResult(true);

        let response;

        try {
            if (prompt !== undefined) {
                response = await myFunction({ question: prompt });
                await savePrompt(prompt);
                setRecentPrompt(prompt);
            } else {
                setPrevPrompt((prev) => [...prev, input]);
                setRecentPrompt(input);
                await savePrompt(input);
                response = await myFunction({ question: input });
            }

            console.log("Full response from myFunction:", response); // Log the full response for debugging

            // Extract necessary fields from response
            const isEG = response.data?.Type === "EG"; // Type field from response
            const answer = response.data?.answer || "No answer available"; // Fallback answer
            const svg = response.data?.svg || null; // Fallback SVG

            console.log("Is EG:", isEG);
            console.log("SVG:", svg);
            console.log("Answer:", answer);

            // Check if the response is an Engineering Graphics problem
            if (isEG) {
                // Display the appropriate response with formatted text
                let responseArray = answer.split("**");
                let newResponse = "";

                for (let i = 0; i < responseArray.length; i++) {
                    if (i === 0 || i % 2 !== 1) {
                        newResponse += responseArray[i];
                    } else {
                        newResponse += "<b>" + responseArray[i] + "</b>";
                    }
                }

                let formattedResponse = newResponse.split("*").join("</br>");
                let newResponseArray = formattedResponse.split(" ");

                // Progressive display of the answer
                for (let i = 0; i < newResponseArray.length; i++) {
                    const nextWord = newResponseArray[i];
                    delayPara(i, nextWord + " ");
                }

                setResultData((prev) => ({
                    ...prev,
                    svg: svg, // Set SVG if available
                }));
            } else {
                // Not an EG problem, display message
                setResultData((prev) => ({
                    ...prev,
                    answer: "This is not an Engineering Graphics problem.",
                    svg: null,
                }));
            }
        } catch (error) {
            console.error("Error analyzing the prompt: ", error);
            setResultData({
                svg: null,
                answer: "There was an error processing your request. Please try again.",
            });
        } finally {
            setLoading(false);
            setInput(""); // Reset input after processing
        }
    };

    return (
        <Context.Provider value={{
            input,
            setInput,
            recentPrompt,
            prevPrompt,
            showResult,
            loading,
            resultData,
            savePrompt,
            loadPreviousPrompts,
            handleImageUpload,
            newChat,
            onSent
        }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
