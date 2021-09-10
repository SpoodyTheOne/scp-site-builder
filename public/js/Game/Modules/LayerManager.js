import Game from "../Game.js";
import BackgroundLayer from "../Objects/BackgroundLayer.js";
import DebugLayer from "../Objects/DebugLayer.js";
import DrawingLayer from "../src/DrawingLayer.js";
import GameModule from "/js/Game/GameModule.js";

export default class LayerManager extends GameModule {
	constructor(Priority) {
		super("Layer Manager", "default.layermanager", Priority);

		this.Load = (msg) => {
			msg("Creating Layers");

			Game.Drawing.AddLayer(new BackgroundLayer());
			Game.Drawing.AddLayer(new DebugLayer());
		};
	}
}
