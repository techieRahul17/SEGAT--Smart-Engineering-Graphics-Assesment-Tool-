import React from 'react';
import { FiPlusCircle, FiSettings, FiX } from 'react-icons/fi';

const Sidebar = ({ conversations, onSelectConversation, onNewChat, onCloseSidebar, onSettings }) => {
    return (
        <div className="sidebar">
            <h3>Previous Conversations</h3>
            <ul>
                {conversations.map((conversation, index) => (
                    <li key={index} onClick={() => onSelectConversation(conversation)}>
                        {conversation.summary}
                    </li>
                ))}
            </ul>
            <div className="sidebar-options">
                <div className="option" onClick={onNewChat}>
                    <FiPlusCircle /> New Chat
                </div>
                <div className="option" onClick={onSettings}>
                    <FiSettings /> Settings
                </div>
                <div className="option" onClick={onCloseSidebar}>
                    <FiX /> Close Sidebar
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
