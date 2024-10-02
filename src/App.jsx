// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import './index.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userName, setUserName] = useState('Rahul');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // Function to call Firebase Cloud Function
    const callFirebaseFunction = async (message) => {
        try {
            const response = await fetch("http://127.0.0.1:5001/segat-react-vite/us-central1/on_request_example", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message, // Send the user message to the cloud function
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Parse response as JSON
            console.log("Response from Firebase function:", data);

            // Add the AI's response to the message list
            const aiMessage = { sender: 'ai', text: data.output }; // Assuming 'output' is the field from Firebase function
            setMessages((prevMessages) => [...prevMessages, aiMessage]);

        } catch (error) {
            console.error("Error calling Firebase function:", error);
        }
    };

    const handleSendMessage = (message) => {
        const newMessage = { sender: 'user', text: message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Call the Firebase function with the user message
        callFirebaseFunction(message);
    };

    const handleSelectConversation = (conversation) => {
        setMessages(conversation.messages);
    };

    const handleNewChat = () => {
        setMessages([]);
        // Add logic to start a new conversation
    };

    const handleSettings = () => {
        alert("Navigate to settings page.");
        // Implement navigation to settings
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="app">
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </button>
            {sidebarOpen && (
                <Sidebar
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    onNewChat={handleNewChat}
                    onCloseSidebar={handleCloseSidebar}
                    onSettings={handleSettings}
                />
            )}
            <ChatInterface messages={messages} onSendMessage={handleSendMessage} userName={userName} />
        </div>
    );
};

export default App;
