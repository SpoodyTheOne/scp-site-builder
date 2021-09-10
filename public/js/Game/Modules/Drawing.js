import Game from "../Game.js";
import DrawingLayer from "../src/DrawingLayer.js";
import Vector from "../src/Vector.js";
import GameModule from "/js/Game/GameModule.js";

export default class Drawing extends GameModule {
	constructor(priority) {
		super("Drawing Module", "default.drawing", priority);

		/**
		 * Called when game loads
		 * @param {Function} msg
		 */
		this.Load = (msg) => {
			msg("Creating Canvas...");
			this.Canvas = document.createElement("canvas");
			document.body.appendChild(this.Canvas);

			msg("Creating CanvasContext...");
			this.DrawingContext = this.Canvas.getContext("2d");
			this.DrawingContext.filter = "";

			Game.Events.on("Scroll", (delta) => {
				this.ZoomCamera(delta / 10);
			});

			Game.Events.on("MouseDrag", (Offset) => {
				this.MoveCamera(Offset);
			});

			msg("Drawing Module loaded");
			Game.Drawing = this;
		};

		/**
		 * Moves all layers
		 * @param {Vector} Offset
		 */
		this.MoveCamera = (Offset) => {
			for (let layer of this.Layers) {
				layer.MoveOffset(Offset);
			}
		};

		/**
		 * Zooms all layers
		 * @param {Number} Zoom
		 */
		this.ZoomCamera = (Zoom) => {
			for (let layer of this.Layers) {
				layer.AddZoom(Zoom);
			}
		};

		/**
		 * Draw the game.
		 */
		this.Draw = () => {
			let ctx = this.DrawingContext;

			this.Canvas.width = window.innerWidth;
			this.Canvas.height = window.innerHeight;

			//Clear canvas to prepare for drawing
			ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
			ctx.translate(this.Canvas.width / 2, this.Canvas.height / 2);

			for (let Layer of this.Layers) {
				Layer.Draw(ctx);
			}

			ctx.setTransform(1, 0, 0, 1, 0, 0);
		};

		/**
		 * Sorts the DrawingLayers according to their order value
		 */
		this.SortLayers = () => {
			this.Layers.sort((a, b) => {
				return a.order - b.order;
			});
		};

		/**
		 *
		 * @param {DrawingLayer} Layer
		 */
		this.AddLayer = (Layer) => {
			this.Layers.push(Layer);
			//sort layers when adding new layers
			this.SortLayers();
		};

		/** @type {HTMLCanvasElement} */
		this.Canvas = undefined;
		/** @type {CanvasRenderingContext2D} */
		this.DrawingContext = undefined;

		/** @type {DrawingLayer[]} */
		this.Layers = [];
	}

	/**
	 * Gets the drawing context of the current Game.Drawing instance.
	 * @returns {CanvasRenderingContext2D}
	 */
	static GetDrawingContext = () => {
		return Game.Drawing.DrawingContext;
	};
}
