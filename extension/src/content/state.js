class State {
	
	static #instance = new State();
	
	static getInstance() {
		return State.#instance;
	}
		
	isInitialized = false;
	version = "";
	targets = {};
	targetCount = 0;
	targetIds = [];
	

	setTargets(targets){
		this.targets = targets;
		this.targetIds = Object.keys(targets);
		this.targetCount = this.targetIds.length;
		this.isInitialized = true;
	}
}
