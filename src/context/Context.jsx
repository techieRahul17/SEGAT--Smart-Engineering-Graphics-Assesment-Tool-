// src/context/Context.jsx
import { createContext, useState } from "react";
import {db, myFunction, storage} from "../firebase"; // Import Firestore and Storage
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
    const [resultData, setResultData] = useState({ svg: null, answer: null });

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
        setResultData({ svg: null, answer: null });
    };

    const delayPara = (index, word) => {
        setTimeout(() => {
            setResultData((prev) => ({
                ...prev,
                answer: (prev.answer || "") + word
            }));
        }, 10 * index);
    };

    const onSent = async (prompt) => {
        setResultData({ svg: null, answer: null });
        setLoading(true);
        setShowResult(true);

        let response;

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

        // Process the answer
        let answer = response.data.answer;
        let responseArray = answer.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");

        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setResultData((prev) => ({
            ...prev,
            svg: response.data.svg
        }));

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
        loadPreviousPrompts,
        handleImageUpload,
    };

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    );
};

export default ContextProvider;