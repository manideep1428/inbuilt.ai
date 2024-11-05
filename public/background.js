// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "aiTools",
        title: "AI Tools",
        contexts: ["selection"], // Show only when text is selected
    });
});

// Add a listener for context menu item clicks
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "aiTools") {
        const selectedText = info.selectionText;
        // Here you can handle what happens when the user clicks the context menu item
        console.log("Selected text:", selectedText);
        // You can also send a message to the content script or open a popup, etc.
        alert(`You selected: ${selectedText}`);
    }
});
