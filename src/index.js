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

        // General case
        let ID = URL.match(/\/([0-9]+)/gi);
        ID ? ID = ID[0].replace('/', '') : null;

        // Games
        if (!ID) {
            ID = URL.match(/PlaceId=([0-9]+)/gi);
            ID ? ID = ID[0].replace(/PlaceId=/gi, '') : null;
        }

        // Groups
        if (!ID) {
            ID = URL.match(/gid=([0-9]+)/gi);
            ID ? ID = ID[0].replace(/gid=/gi, '') : null;
        }

        // Copy to clipboard
        if (ID) {
            let tempCopyInput = document.createElement("textarea");
            tempCopyInput.textContent = ID;
            document.body.appendChild(tempCopyInput);
            tempCopyInput.select();
            document.execCommand('copy');
            tempCopyInput.blur();
            document.body.removeChild(tempCopyInput);
        }
    }
});
