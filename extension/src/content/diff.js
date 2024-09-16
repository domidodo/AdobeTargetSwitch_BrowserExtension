class Diff {
	
	static buildDiffToolBar(offHtml, onHtml){
		let buttonBox = document.createElement('div');
		buttonBox.classList.add('button-box');
		buttonBox.style.background = 'red';
		buttonBox.style.display = 'none';
		buttonBox.style.justifyContent = 'flex-end';

		// Button A erstellen
		let buttonA = document.createElement('button');
		buttonA.style.marginTop = '5px';
		buttonA.style.marginBottom = '5px';
		buttonA.style.background = '#e7e7e7';
		buttonA.style.color = 'black';
		buttonA.style.padding = '5px 20px';
		buttonA.style.textAlign = 'center';
		buttonA.style.textDecoration = 'none';
		buttonA.style.fontSize = '10px';
		buttonA.innerText = 'Show diff';
		buttonA.onclick = function(event) {
			event.preventDefault();
			event.cancelBubble = true;
			Diff.openDiff(offHtml, onHtml);
		};
		buttonBox.appendChild(buttonA);
		
		return buttonBox;
	}
	
	static openDiff(item1, item2) {
		const form = document.createElement("form");
		form.method = "POST";
		form.action = "https://text-compare.com/";
		form.target = "_blank";

		const formattedOn = Diff.#formatHtml(item1);
		const formattedOff = Diff.#formatHtml(item2);
					

		const input = document.createElement("input");
		input.type = "hidden";
		input.name = "text1";
		input.value = formattedOn;
		form.appendChild(input);
		
		const input2 = document.createElement("input");
		input2.type = "hidden";
		input2.name = "text2";
		input2.value = formattedOff;
		form.appendChild(input2);

		document.body.appendChild(form);
		form.submit();

		document.body.removeChild(form);
	}

	static #formatHtml(html) {
		var tab = '\t';
		var result = '';
		var indent= '';

		html.split(/>\s*</).forEach(function(element) {
			if (element.match( /^\/\w/ )) {
				indent = indent.substring(tab.length);
			}

			result += indent + '<' + element + '>\r\n';

			if (element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith("input")  ) { 
				indent += tab;              
			}
		});

		return result.substring(1, result.length-3);
	}
}
