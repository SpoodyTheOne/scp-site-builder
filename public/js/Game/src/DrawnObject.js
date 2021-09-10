import Vector from "./Vector.js";

export default class DrawnObject {
	/**
	 *
	 * @param {Vector} Position
	 * @param {Vector} Size
	 */
	constructor(Position, Size) {
		this.position = Position;
		this.size = Size;

		/**
		 * Draw this object using a CanvasRenderingContext2D
		 * @param {CanvasRenderingContext2D} ctx
		 */
		this.Draw = (ctx) => {
			ctx.fillStyle = "#ff0000";
			ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
		};
	}
}
