document.addEventListener('DOMContentLoaded', function () {
    const elementsCount = document.getElementById('elements-count');
    const checkDisable = document.getElementById('checkDisable');

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {action: "getTagetCount"}, function(response) {
			elementsCount.textContent = response;
		});
	  
		checkDisable.addEventListener('change', function () {
			if (this.checked) {
				console.log('Namen ausblenden aktiviert');
			} else {
				console.log('Namen ausblenden deaktiviert');
            }
			
			chrome.action.setIcon({ path: this.checked ? "AdobeTargetSwitchOff.png" : "AdobeTargetSwitchOn.png" });
			
			chrome.tabs.sendMessage(activeTab.id, {action: "disableAdobeTarget", value: this.checked}, function(response) {});
		});
	});
});


