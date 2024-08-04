chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes("at.js")) {
		if (details.frameId === 0) {
			chrome.tabs.sendMessage(details.tabId, { action: "hasAdobeTarget", active: true }, function(response) {});
		}else{
			return { cancel: true };  
		}
    }
  },
  { 
	urls: ["<all_urls>"]
  },
  ["blocking"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getScriptPath') {
    sendResponse(adobeTargetScript);
  }
});
