chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
	if (!tab.url) {
		return;
	}
	
	if(tab.status !== 'complete') {
		return;
	}
	
	const loadOffers = function() {
		(async () => {
			if (window.adobe?.target) {
				const offers = await window.adobe.target.getOffers({
					request: {
						execute: {
							pageLoad: {
								parameters: {}
							}
						}
					}
				});
				
				offers.version = window.adobe.target.VERSION;
				
				const evt = new CustomEvent("adobeTargetOffersLoaded", { detail: offers });
				document.dispatchEvent(evt);
			} else {
				const evt = new CustomEvent("adobeTargetOffersLoaded");
				document.dispatchEvent(evt);
			}
		})();
	};

	chrome.scripting.executeScript({
		target: {tabId: tabId},
		func: loadOffers,
		world: 'MAIN'
	});
});


// ---------- Helper ---------------------

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}