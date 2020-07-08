chrome.runtime.onMessage.addListener(function (message, sender) {
    if (message.myPopupIsOpen) {
        chrome.tabs.executeScript(null, { file: "content.js" });
    }
    if(message.clickSubmit){
        chrome.tabs.executeScript(null,{file:"submit.js"});
    }

});

chrome.storage.local.set({ "x": 1,"validate":false,"continueSubmit":false,"pageAndUrl":false });