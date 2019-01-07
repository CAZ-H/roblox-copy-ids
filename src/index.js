
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "CopyID",
        title: "Copy ID",
        contexts: ["link"],
        documentUrlPatterns: ["*://*.roblox.com/*"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === "CopyID"){
        const URL = info.linkUrl;
        const ID = URL.match(/(?<=\/)([0-9]+)/g);

        let tempCopyInput = document.createElement("textarea");
        tempCopyInput.textContent = ID;
        document.body.appendChild(tempCopyInput);
        tempCopyInput.select();
        document.execCommand('copy');
        tempCopyInput.blur();
        document.body.removeChild(tempCopyInput);
    }
});
