document.addEventListener('DOMContentLoaded', function () {
    const stateSearching = document.getElementById('state-targets-searching');
    const stateUnBlocked = document.getElementById('state-targets-unblocked');
    const stateNotExists = document.getElementById('state-targets-notexists');
    const stateExists = document.getElementById('state-targets-exists');
	
    const elementsVersion = document.getElementById('elements-version');
    const elementsCount = document.getElementById('elements-count');
    const checkBlock = document.getElementById('checkBlock');
    const checkDisable = document.getElementById('checkDisable');
    const checkHailight = document.getElementById('checkHailight');
	const tbody = document.getElementById('targets-table-body');

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {action: "getState"}, function(response) {
			if(response.isInitialized) {
				stateSearching.style.display ="none";
				if(response.version.length === 0 || response.targetCount === 0) {
					if(!checkBlock.checked){
						stateNotExists.style.display ="block";
					}else{
						stateUnBlocked.style.display ="none";
						stateExists.style.display ="block";
					}
					return;
				}
				
				stateExists.style.display ="block";
				
				elementsVersion.textContent = response.version;
				elementsCount.textContent = response.targetCount;
				checkDisable.checked = response.targetDisable;
				checkHailight.checked = !response.targetHighlightDisable;
				
				checkDisable.disabled = false;
				checkHailight.disabled = false;
				
				tbody.innerHTML = '';
				response.targetIds.forEach(id => {
					const row = document.createElement('tr');
					const cell = document.createElement('td');
					cell.textContent = id;
					row.appendChild(cell);
					tbody.appendChild(row);
				});
			}
		});
		
		checkDisable.addEventListener('change', function () {
			// chrome.action.setIcon({ path: this.checked ? "/img/AdobeTargetSwitchOff.png" : "/img/AdobeTargetSwitchOn.png" });
			chrome.tabs.sendMessage(activeTab.id, {action: "disableAdobeTarget", value: this.checked}, function(response) {});
		});
		
		checkHailight.addEventListener('change', function () {
			chrome.tabs.sendMessage(activeTab.id, {action: "hailightTargets", value: this.checked}, function(response) {});
		});
		
	});
	
	chrome.declarativeNetRequest.getEnabledRulesets((rulesets) => {
		checkBlock.checked = rulesets.includes('ruleset_blockAtJs');
	});
	
	checkBlock.addEventListener('change', function () {
		
		if(checkBlock.checked){
			enableRuleSet();
			stateUnBlocked.style.display = 'none';
		} else {
			disableRuleSet();
			stateUnBlocked.style.display = 'block';
			stateSearching.style.display = 'block';
			stateExists.style.display = 'none';
		}
		
		chrome.tabs.query({}, (tabs) => {
			tabs.forEach((tab) => {
				chrome.tabs.reload(tab.id, { bypassCache: true });
			});
		});
	});
});


// ---------- Helper ---------------------

function enableRuleSet() {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: [ "ruleset_blockAtJs" ]
  });
}

function disableRuleSet() {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: [ "ruleset_blockAtJs" ]
  });
}