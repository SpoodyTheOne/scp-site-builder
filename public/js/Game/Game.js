import Drawing from "./Modules/Drawing.js";
import Events from "./Modules/Events.js";
import Input from "./Modules/Input.js";
import GameModule from "/js/Game/GameModule.js";

export default class Game {
	/**
	 *
	 * @param {Number} Amount
	 * The amount of money to earn
	 */
	static Earn = (Amount) => {
		this.Money += Amount;
	};

	/**
	 *
	 * @param {GameModule} Module
	 * The module to be added
	 */
	static AddModule = (Module) => {
		this.Modules[Module.id] = Module;
	};

	/**
	 *
	 * @param {Function} Progress The progress as a fraction
	 * @param {Function} Message The message to be displayed while loading
	 * @returns
	 */
	static Load = (Progress, Message) => {
		return new Promise(async (resolve, reject) => {
			let Modules = this.GetSortedModules();

			let length = Modules.length;
			let index = 1;

			await new Promise((resolve) => setTimeout(resolve, 100));

			for (let [id, module] of Modules) {
				Progress(index / length);
				index++;
				await module.Load(Message);
				await new Promise((resolve) => setTimeout(resolve, 500 * Math.random()));
			}

			Message("Finished Loading, Starting...");

			requestAnimationFrame(this.UpdateLoop);

			resolve();
		});
	};

	static UpdateLoop = () => {
		this.Drawing.Draw();

		requestAnimationFrame(this.UpdateLoop);
	};

	static GetSortedModules = () => {
		/** @type {Array} */
		let Modules = Object.entries(this.Modules);

		Modules.sort((a, b) => {
			return b[1].priority - a[1].priority;
		});

		return Modules;
	};

	/** @type {Events} */
	static Events = null;
	/** @type {Drawing} */
	static Drawing = null;
	/** @type {Input} */
	static Input = null;

	/** All modules that are loaded */
	static Modules = {};
}
