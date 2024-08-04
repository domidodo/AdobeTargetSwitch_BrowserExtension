window.adobetargetswitch = {};

function compareAndMarkDifferences(iframeOuterElements) {
	for (const id in iframeOuterElements) {
		
		if(id.length > 0){		
			const outerHTML = iframeOuterElements[id];
			const originalElement = document.getElementById(id);
		
			if (originalElement && originalElement.tagName !== 'BODY') {
				const originalouterHTML = originalElement.outerHTML;
				if (originalouterHTML !== outerHTML) {
					originalElement.classList.add("adobe-target-switch");
					
					window.adobetargetswitch[id] = {
						off: outerHTML,
						on: originalouterHTML
					};
				}
			}
		}
	}
}

function start(){
	const iframe = document.createElement("iframe");
	iframe.style.display = "none";
	//iframe.style.width = "1000px";
	//iframe.style.height = "100px";
	iframe.src = window.location.href;
	
	iframe.onload = function(){
		const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
		
		const iframeOuterElements = {};
		var iframeElements = iframeDocument.querySelectorAll("*[id]");
		
		iframeElements.forEach(iframeElement => {
			iframeOuterElements[iframeElement.id] = iframeElement.outerHTML;
		});
		iframe.remove();
		compareAndMarkDifferences(iframeOuterElements);
	};
	document.body.appendChild(iframe);
}

chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if (request.action === "hasAdobeTarget" && request.active) {
		window.addEventListener('load', function () {
			start();
		});
	}else if (request.action === "getTagetCount") {
		response(Object.keys(window.adobetargetswitch).length);
	}else if (request.action === "disableAdobeTarget") {
		
		Object.keys(window.adobetargetswitch).forEach(function (key) {
			const target = document.getElementById(key);
			if(request.value){
				target.outerHTML = window.adobetargetswitch[target.id].off;
			}else{
				target.outerHTML = window.adobetargetswitch[target.id].on;
			}
		});
	}
});