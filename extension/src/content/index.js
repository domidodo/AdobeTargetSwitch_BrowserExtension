async function onInitEvent(offers) {
	const state = State.getInstance();
	const settings = Settings.getInstance();
	
	if(offers) {
		const offersConverter = new OffersConverter();
		const targets = await offersConverter.convert(offers);
		
		state.version = offers.version;
		state.setTargets(targets);
		
		settings.getSetting('targetDisable').then((value) => {
			onDisableAdobeTargetEvent(value);
			
			settings.getSetting('targetHighlightDisable').then((value) => {
				onHailightTargetsEvent(!value);
			});
		});
	}
	
	state.isInitialized = true;
}

function onGetStateEvent(response) {
	const settings = Settings.getInstance();
	const stateClone = JSON.parse(JSON.stringify(State.getInstance()));
	
	settings.getSetting('targetDisable').then((value) => {
		stateClone.targetDisable = value;
		
		settings.getSetting('targetHighlightDisable').then((value) => {
			stateClone.targetHighlightDisable = value;
			response(stateClone);
		});
	});
}

function onDisableAdobeTargetEvent(isDisabled) {
	const state = State.getInstance();
	const settings = Settings.getInstance();
	const targetIds = state.targetIds;
	
	settings.setSetting('targetDisable', isDisabled).then(() => {
		targetIds.forEach(function (key) {
			document.querySelectorAll(key).forEach(targetElm => {
				const target = state.targets[key];
				if(target) {
					targetElm.outerHTML = isDisabled ? target.off : target.on;
				}
			});
		});
		
		setTimeout(() => {
			settings.getSetting('targetHighlightDisable').then((value) => {
				onHailightTargetsEvent(!value);
			});
		}, 100);		
	});
}

function onHailightTargetsEvent(isDisabled) {
	const state = State.getInstance();
	const settings = Settings.getInstance();
	const targetIds = state.targetIds;
	
	settings.setSetting('targetHighlightDisable', !isDisabled).then(() => {
		targetIds.forEach(function (key) {
			document.querySelectorAll(key).forEach(target => {
				if(isDisabled){
					target.style.setProperty('border', '5px solid red', 'important');
					
					if(target.showDiffToolBar === undefined) {			
						const off = state.targets[key].off;
						const on = state.targets[key].on;
						
						const diffToolBar = Diff.buildDiffToolBar(off, on);
						target.appendChild(diffToolBar);
						
						target.addEventListener("mouseover", (event) => {
							if(target.showDiffToolBar) {
								diffToolBar.style.display = 'flex';
							}
						});
						target.addEventListener("mouseleave", (event) => {
							diffToolBar.style.display = 'none';
						});
					}
					target.showDiffToolBar = true;
				}else{
					target.showDiffToolBar = false;
					target.style.border = 'none';
				}
			});
		});
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if (request.action === "getState") {
		onGetStateEvent(response);
	}else if (request.action === "disableAdobeTarget") {
		onDisableAdobeTargetEvent(request.value);
	}else if (request.action === "hailightTargets") {
		onHailightTargetsEvent(request.value);
	}
	
	return true;
});

document.addEventListener('adobeTargetOffersLoaded', function(evt) {
	onInitEvent(evt.detail);
}, { once: true });