class Settings {
	static #instance = new Settings();
	
	
	static getInstance() {
		return Settings.#instance;
	}
	
    #loadSettings() {
		const defaultSettings = {
			targetDisable: false,
			targetHighlightDisable: true
		};
		
		return new Promise((resolve, reject) => {
		    chrome.storage.sync.get(defaultSettings, (result) => {
		        if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    #saveSettings(settings) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(settings, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    setSetting(key, value) {
		return this.#loadSettings().then((settings) => {
			settings[key] = value;
            return this.#saveSettings(settings);
        });
    }

    getSetting(key) {
        return this.#loadSettings().then((settings) => {
            return settings[key];
        });
    }
}