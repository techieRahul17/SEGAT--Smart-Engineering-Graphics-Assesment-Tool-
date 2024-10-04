import { useEffect, useState } from "react";

const useSpeechRecognition = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            setError("Speech recognition not supported");
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();

        recognitionInstance.continuous = false; // Stop after one result
        recognitionInstance.interimResults = false; // Get final result only

        recognitionInstance.onstart = () => {
            setIsListening(true);
        };

        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            recognitionInstance.stop(); // Stop recognition after getting result
        };

        recognitionInstance.onerror = (event) => {
            setError(event.error);
            recognitionInstance.stop();
        };

        recognitionInstance.onend = () => {
            setIsListening(false);
        };

        setRecognition(recognitionInstance);
    }, [onResult]);

    const startListening = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    return {
        isListening,
        error,
        startListening,
        stopListening,
    };
};

export default useSpeechRecognition;
