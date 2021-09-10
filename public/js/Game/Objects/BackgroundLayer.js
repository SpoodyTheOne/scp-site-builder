import Game from "../Game.js";
import Drawing from "../Modules/Drawing.js";
import DrawingLayer from "../src/DrawingLayer.js";
import Vector from "../src/Vector.js";

export default class BackgroundLayer extends DrawingLayer {
	constructor() {
		super(-69);

		/*Game.Events.on("Scroll", (s) => {
			this.zoom = Math.max(Math.min(this.zoom + s,10),0.5)
		});*/

		/**
		 *
		 * @param {CanvasRenderingContext2D} ctx
		 */
		this.Draw = (ctx) => {
			//let ctx = Drawing.GetDrawingContext();
			ctx.filter = this.filter;

			let PrimaryLineSize = 150;
			let SecondaryLineSize = 50;

			//assume that Drawing already translates to center of canvas
			ctx.scale(this.zoom, this.zoom);
			ctx.translate(-Game.Drawing.Canvas.width / 2, -Game.Drawing.Canvas.height / 2);
			//ctx.translate(this.offset.x % (PrimaryLineSize * this.zoom), this.offset.y % (PrimaryLineSize * this.zoom));

			//Drawing here
			let width = Game.Drawing.Canvas.width * this.zoom + PrimaryLineSize;
			let height = Game.Drawing.Canvas.height * this.zoom + PrimaryLineSize;

			let offset = this.offset.mod(PrimaryLineSize);

			for (let x = -PrimaryLineSize; x < width; x += SecondaryLineSize) {
				ctx.beginPath();
				ctx.moveTo(x + offset.x, -PrimaryLineSize + offset.y);
				ctx.lineTo(x + offset.x, height + offset.y);

				if (x % PrimaryLineSize == 0) ctx.strokeStyle = "#eee";
				else ctx.strokeStyle = "#777";

				ctx.stroke();
			}

			for (let y = -PrimaryLineSize; y < height; y += SecondaryLineSize) {
				ctx.beginPath();
				ctx.moveTo(-PrimaryLineSize + offset.x, y + offset.y);
				ctx.lineTo(width + offset.x, y + offset.y);

				if (y % PrimaryLineSize == 0) ctx.strokeStyle = "#eee";
				else ctx.strokeStyle = "#777";

				ctx.stroke();
			}

			let pos = Game.Input.MousePosition.sub(offset).div(SecondaryLineSize);

			pos = new Vector(Math.round(pos.x), Math.round(pos.y)).mult(SecondaryLineSize).add(offset);

			ctx.fillStyle = "red";
			ctx.fillRect(pos.x, pos.y, 5, 5);

			ctx.scale(-this.zoom, -this.zoom);
			//ctx.translate(-this.offset.x, -this.offset.y);
		};
	}
}
