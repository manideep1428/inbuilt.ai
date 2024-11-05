
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");

    chrome.contextMenus.create({
        id: "aiTools",
        title: "AI Tools",
        contexts: ["selection"],
    });

    chrome.contextMenus.create({
        id: "definition",
        title: "Definition",
        parentId: "aiTools",
        contexts: ["selection"],
    });

    chrome.contextMenus.create({
        id: "summarize",
        title: "Summarize",
        parentId: "aiTools",
        contexts: ["selection"],
    });

    chrome.contextMenus.create({
        id: "rewrite",
        title: "Rewrite",
        parentId: "aiTools",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    console.log(`Context menu item clicked. Selection: ${info.selectionText}`);

    const selectedText = info.selectionText;
    let action = "";

    switch (info.menuItemId) {
        case "definition":
            action = "showDefinition";
            break;
        case "summarize":
            action = "showSummarize";
            break;
        case "rewrite":
            action = "showRewrite";
            break;
        default:
            return;
    }

    chrome.storage.local.set({ selectedText, action }, () => {
        if (chrome.runtime.lastError) {
            console.error("Storage error:", chrome.runtime.lastError);
        } else {
            console.log(`Stored: ${selectedText} for action: ${action}`);
            chrome.action.openPopup();
        }
    });
});
