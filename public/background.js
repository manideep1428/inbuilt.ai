// background.js
chrome.runtime.onInstalled.addListener(() => {
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
        chrome.windows.create({
            url: "index.html",
            type: "popup",
            width: 300,
            height: 200,
        });
    });
});
