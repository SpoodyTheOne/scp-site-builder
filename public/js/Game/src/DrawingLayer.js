import Drawing from "../Modules/Drawing.js";
import DrawnObject from "./DrawnObject.js";
import Vector from "./Vector.js";

export default class DrawingLayer {
	constructor(order) {
        /** CSS filters for this layer */
		this.filter = "";
        /** The offset in pixels (scaled by zoom) */
		this.offset = new Vector();
        /** The scale of this layer, larger = more zoomed in */
		this.zoom = 1;
        /** The draw order of this layer */
		this.order = order || 0;

		/** @type {DrawnObject[]} */
		this.objects = [];

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         */
		this.Draw = (ctx) => {
			//let ctx = Drawing.GetDrawingContext();
			ctx.filter = this.filter;

			//assume that Drawing already translates to center of canvas
			ctx.translate(this.offset.x, this.offset.y);
            ctx.scale(this.zoom, this.zoom);

			for (let object of this.objects) {
				object.Draw(ctx);
			}

			ctx.scale(-this.zoom, -this.zoom);
			ctx.translate(-this.offset.x, -this.offset.y);
		};

        /**
         * Sets the zoom of this layer
         * @param {number} zoom 
         */
        this.SetZoom = (zoom) => {
            this.zoom = zoom;
        }

        /**
         * Sets the offset of this layer
         * @param {Vector} offset 
         */
         this.SetOffset = (offset) => {
            this.offset = offset;
        }

        /**
         * Adds to this layers zoom
         * @param {Number} zoom 
         */
        this.AddZoom = (zoom) => {
            this.zoom = Math.max(this.zoom + zoom * this.zoom,1)
        }


        /**
         * Moves this layer
         * @param {Vector} offset 
         */
         this.MoveOffset = (offset) => {
            this.offset = this.offset.add(offset.div(this.zoom));
        }
	}
}
