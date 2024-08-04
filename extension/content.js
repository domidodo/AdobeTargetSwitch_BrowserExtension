window.addEventListener('load', function () {
	function compareAndMarkDifferences(iframeOuterElements) {
    	for (const id in iframeOuterElements) {
			const outerHTML = iframeOuterElements[id];
			const originalElement = document.getElementById(id);
		
			if (originalElement) {
				const originalouterHTML = originalElement.outerHTML;
				if (originalouterHTML !== outerHTML) {
					originalElement.classList.add("adobe-target-switch");
					originalElement.adobeTargetSwitchOff = outerHTML;
					originalElement.adobeTargetSwitchOn = originalouterHTML;
				}
			}
		}
	}
	
	const iframe = document.createElement("iframe");
	iframe.style.display = "none";
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
});