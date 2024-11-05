import { useState, useEffect } from 'react';
import { BookOpen, FileText, PenTool, Save } from 'lucide-react';

interface SavedPage {
  url: string;
  content: string;
}

export default function DefaultPopup() {
  const [selectedText, setSelectedText] = useState('');
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);

  useEffect(() => {
    // Load saved pages from storage when the component mounts
    chrome.storage.local.get(['savedPages'], (result) => {
      if (result.savedPages) {
        setSavedPages(result.savedPages);
      }
    });

    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener((request) => {
      if (request.action === 'updateSelectedText') {
        setSelectedText(request.text);
      }
    });
  }, []);

  const handleDefine = async () => {
    console.log('Defining:', selectedText);
    // Implement API call for definition here
  };

  const handleSummarize = async () => {
    console.log('Summarizing current page');
    // Implement API call for summarization here
  };

  const handleRewrite = async () => {
    console.log('Opening rewrite interface');
    // Implement rewrite functionality here
  };

  const handleSavePage = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab.url) {
        const newSavedPage: SavedPage = {
          url: currentTab.url,
          content: 'Page content here' // You would need to implement a way to get the actual page content
        };
        const updatedSavedPages = [...savedPages, newSavedPage];
        setSavedPages(updatedSavedPages);
        chrome.storage.local.set({ savedPages: updatedSavedPages });
      }
    });
  };

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Page Assistant</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={handleDefine}
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Define
        </button>
        <button
          onClick={handleSummarize}
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Summarize
        </button>
        <button
          onClick={handleRewrite}
          className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          <PenTool className="w-4 h-4 mr-2" />
          Rewrite
        </button>
        <button
          onClick={handleSavePage}
          className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Page
        </button>
      </div>
      {selectedText && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Selected Text:</h2>
          <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{selectedText}</p>
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Saved Pages:</h2>
        <ul className="text-sm text-gray-600">
          {savedPages.map((page, index) => (
            <li key={index} className="mb-1 truncate">
              {page.url}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}