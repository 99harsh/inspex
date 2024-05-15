chrome.runtime.onInstalled.addListener(() => {

    console.log("ON INSTALasLAED")
    chrome.action.setBadgeText({
        text: "OFF",
    });
    chrome.storage.sync.set({
        _HTMLTEXTELEMENTS: ["h1", "h2", "h3", "h4", "h5", "span", "a", "button", "p", "td", "input", "select"],
        _UNITS: ["px", "%", "rem", "em", "vh", "vw", "vmin", "vmax", "ch", "ex", "cm", "mm", "in", "pt", "pc"],
        _COLORPALETS: [{
            selector: "inspex-font-color-palet",
            style: "color"
        },
        {
            selector: "inspex-background-color-palet",
            style: "background-color"
        }],

       

    });
});



chrome.action.onClicked.addListener(async (tab) => {

    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, nextState);
    });
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

});


