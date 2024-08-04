document.addEventListener('DOMContentLoaded', function () {
    const elementsCount = document.getElementById('elements-count');
    const checkDisable = document.getElementById('checkDisable');
    const checkHailight = document.getElementById('checkHailight');

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {action: "getTagetCount"}, function(response) {
			elementsCount.textContent = response;
		});
	  
		checkDisable.addEventListener('change', function () {
			chrome.action.setIcon({ path: this.checked ? "AdobeTargetSwitchOff.png" : "AdobeTargetSwitchOn.png" });
			chrome.tabs.sendMessage(activeTab.id, {action: "disableAdobeTarget", value: this.checked}, function(response) {});
		});
		
		checkHailight.addEventListener('change', function () {
			chrome.tabs.sendMessage(activeTab.id, {action: "hailightTargets", value: this.checked}, function(response) {});
		});
		
		
	});
});


