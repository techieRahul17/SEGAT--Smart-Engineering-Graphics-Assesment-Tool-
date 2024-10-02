import React, { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { httpsCallable } from "firebase/functions"; // Import httpsCallable
import { functions } from '../firebaseconfig'; // Import the functions instance

// eslint-disable-next-line react/prop-types
const ChatInterface = ({ onSendMessage, messages, userName }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = { sender: 'user', text: input };
            onSendMessage(newMessage); // Add the user message to the chat

            // Call the Firebase function here
            const callAI = httpsCallable(functions, 'on_request_example'); // Call your Firebase function
            callAI({ question: input }) // Send the input as 'question'
                .then((result) => {
                    const aiMessage = { sender: 'ai', text: result.data.Diagram + " " + result.data['Numerical Answer'] }; // Combine the diagram and numerical answer
                    onSendMessage(aiMessage); // Add AI's response to chat
                })
                .catch((error) => {
                    console.error("Error calling Firebase function: ", error);
                });

            setInput(''); // Clear the input field
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const toggleProfileMenu = () => {
        setProfileMenuVisible(!profileMenuVisible);
    };

    const handleShareConversation = () => {
        alert("Share conversation functionality not yet implemented.");
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <div className="logo">LOGO</div>
                <div className="user-info">
                    <div className="user-name">{userName}</div>
                    <div className="share-btn" onClick={handleShareConversation}>
                        <FiShare2 />
                    </div>
                    <div className="user-profile" onMouseEnter={toggleProfileMenu} onMouseLeave={toggleProfileMenu}>
                        <FaUserCircle />
                        {profileMenuVisible && (
                            <div className="profile-menu">
                                <ul>
                                    <li>Profile</li>
                                    <li>Settings</li>
                                    <li>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {/* eslint-disable-next-line react/prop-types */}
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <strong>{message.sender === 'user' ? 'You' : 'AI'}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatInterface;
