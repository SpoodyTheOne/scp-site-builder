export default class GameModule {
	constructor(name, id, priority) {
		this.name = name;
		this.id = id;
		this.priority = priority;

		/**
		 * Called when game is loaded
		 */
		this.Load = (Callback) => {
			Callback("Loaded " + this.name);
		};
	}
}
