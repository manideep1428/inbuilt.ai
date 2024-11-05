// src/Popup.jsx
import  { useEffect, useState } from 'react';

const Popup = () => {
    const [content, setContent] = useState("");
    const [action, setAction] = useState("");

    useEffect(() => {
        // Retrieve the selected text and action from storage
        chrome.storage.local.get(['selectedText', 'action'], (result) => {
            if (result.selectedText && result.action) {
                setContent(result.selectedText);
                setAction(result.action);
            }
        });
    }, []);

    const renderContent = () => {
        switch (action) {
            case 'showDefinition':
                return <div>Definition: {content}</div>; // Replace with actual definition logic
            case 'showSummarize':
                return <div>Summary: {content}</div>; // Replace with actual summarization logic
            case 'showRewrite':
                return <div>Rewrite: {content}</div>; // Replace with actual rewrite logic
            default:
                return <div>No action selected.</div>;
        }
    };

    return (
        <div style={{ width: '200px', padding: '10px' }}>
            <h2>AI Tool Result</h2>
            {renderContent()}
        </div>
    );
};

export default Popup;
