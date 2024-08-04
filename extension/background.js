chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes("at.js")) {
	  if (details.frameId !== 0) {
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
