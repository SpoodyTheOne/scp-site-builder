import UILayer from "../src/UILayer.js";

export default class DebugLayer extends UILayer {
	constructor() {
		super(999);

		this.lastFrame = 0;
		this.frameCount = 0;
		this.fps = 0;

		//this.filter = "drop-shadow(2px 2px 1px #000 )";

		/**
		 *
		 * @param {CanvasRenderingContext2D} ctx
		 */
		this.Draw = (ctx) => {
			//ui should be drawn last, so resetting transformation matrix is ok
			ctx.resetTransform();

            ctx.filter = this.filter;

			if (this.lastFrame + 1000 < performance.now()) {
				this.fps = this.frameCount;
				this.frameCount = 0;
				this.lastFrame = performance.now();
			}

			ctx.fillStyle = "#2ecc71";
			ctx.font = "12px sans-serif";
			ctx.fillText(this.fps, 5, 25);

			this.frameCount++;
		};
	}
}
