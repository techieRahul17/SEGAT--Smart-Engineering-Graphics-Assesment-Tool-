// src/context/Context.jsx
import { createContext, useState } from "react";
import run from "../config/gemini";
import { db, storage } from "../firebase"; // Import Firestore and Storage
import { collection, addDoc, getDocs } from "firebase/firestore"; // Import Firestore methods
import { ref, uploadBytes } from "firebase/storage"; // Import Storage methods
import Tesseract from "tesseract.js"; // Make sure to import Tesseract.js

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

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

    const loadPreviousPrompts = async () => {
        const querySnapshot = await getDocs(collection(db, "prompts"));
        const prompts = [];
        querySnapshot.forEach((doc) => {
            prompts.push(doc.data().prompt);
        });
        setPrevPrompt(prompts);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageRef = ref(storage, `images/${file.name}`);

            // Upload image to Firebase Storage
            await uploadBytes(imageRef, file);
            console.log("Image uploaded successfully!");

            // Recognize text from the uploaded image
            const { data: { text } } = await Tesseract.recognize(
                file,
                'eng',
                {
                    logger: info => console.log(info) // Log progress
                }
            );

            setInput(text); // Set recognized text as input
            onSent(text); // Send the recognized text as a prompt
        }
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    // Define delayPara function to handle typing effect
    const delayPara = (i, word) => {
        setTimeout(() => {
            setResultData((prevData) => prevData + word); // Append word to the result data
        }, i * 100); // Adjust the delay as needed (100ms per word here)
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;

        if (prompt !== undefined) {
            response = await run(prompt);
            await savePrompt(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            await savePrompt(input);
            response = await run(input);
        }

        setResultData(response); // Set the formatted response with highlighted headings
        setLoading(false);
        setInput("");
    };


    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        newChat,
        loadPreviousPrompts, // Add the method to load previous prompts
        handleImageUpload, // Add the image upload function
    };

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    );
};

export default ContextProvider;