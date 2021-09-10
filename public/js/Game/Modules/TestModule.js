import GameModule from "/js/Game/GameModule.js";

export default class TestModule extends GameModule {
	constructor(id) {
		super("TestModule", id, 5);

		this.Load = () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, Math.random() * 100);
			});
		};
	}
}
