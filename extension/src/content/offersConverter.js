class OffersConverter {
    
    async convert(offers) {
		
		let targets = this.#offersToDictunary(offers);
		
		targets = await this.#loadDiffs(targets);
		
		return targets;
    }

    #offersToDictunary(offers) {
		const contentDict = {};

		const options = offers.execute.pageLoad.options;

		options.forEach(option => {
			if (option.content) {
				option.content.forEach(item => {
					if (item.cssSelector) {
						const elem = document.querySelector(item.cssSelector);
						if(elem && elem.tagName !== 'BODY'){
							if(!contentDict[item.cssSelector]) {
								contentDict[item.cssSelector] = [];
							}
							
							if(item.type === 'insertBefore' || item.type === 'insertAfter') {
								const targetElem = item.type === 'insertAfter' ? elem.nextSibling : elem.previousSibling;
								if(targetElem){
									if(!targetElem.id) {
										targetElem.id = 'adobetarger-switch-'+Math.random().toString(16).slice(2);
									}
									const cssSelector = '#'+targetElem.id;
									if(!contentDict[cssSelector]) {
										contentDict[cssSelector] = [];
									}
									contentDict[cssSelector].push({
										type: item.type,
										content: item.content
									});
									item.content = 'anchor';
								}
							} else {
								contentDict[item.cssSelector].push({
									type: item.type,
									content: item.content
								});
							}
						}
					}
				});
			}
		});

		return contentDict;
	}

    async #loadDiffs(options) {
		const targets = {};
		
		const offDocument = await fetchAndParseHTML(window.location.href);
		
        for (const optionsSelector in options) {
			let elemOn = document.querySelector(optionsSelector);
			let elemOff = offDocument.querySelector(optionsSelector);
			if(elemOn){
				let target = {
					on: '',
					off: ''
				};
				
				target.on = elemOn.outerHTML;
				if(elemOff){
					target.off = elemOff.outerHTML;
				}else {
					target.off = '<div id="' + optionsSelector.substring(1) + '" style="display:none;"></div>';
				}
				
				targets[optionsSelector] = target;
				
				
				//options[optionsSelector].forEach(option => {
				//	if(option.type === 'setHtml') {
				//		elem.innerHTML = option.content;
				//	}
				//	
				//	if(option.type === 'setAttribute') {
				//		for (const attribute in option.content) {
				//			elem.setAttribute(attribute, option.content[attribute]);
				//		}
				//	}
				//	
				//	if(option.type === 'removeAttribute') {
				//		for (const attribute in option.content) {
				//			elem.removeAttribute(attribute, option.content[attribute]);
				//		}
				//	}
				//	
				//	
				//	if(option.type === 'insertBefore') {
				//		elem.classList.add("adobetarget-switch-child");
				//		elem.outerHTML = '<div>' + option.content + elem.outerHTML +"</div>";
				//		useParentAsTarget = true;
				//	}
				//	
				//	if(option.type === 'insertAfter') {
				//		elem.classList.add("adobetarget-switch-child");
				//		elem.outerHTML = '<div>' + elem.outerHTML + option.content +"</div>";
				//		useParentAsTarget = true;
				//	}
				//});
				
				
				
			}
        }
		
		return targets;
    }
}

async function fetchAndParseHTML(url) {
  try {
    // HTML-Code von der URL herunterladen
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    // HTML als Text aus der Antwort extrahieren
    const htmlText = await response.text();

    // HTML-Text in ein Document-Objekt umwandeln
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    return doc;
  } catch (error) {
    console.error('Fehler beim Abrufen und Parsen der HTML-Seite:', error);
    return null;
  }
}

