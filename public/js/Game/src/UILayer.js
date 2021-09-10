import DrawingLayer from "./DrawingLayer.js";

export default class UILayer extends DrawingLayer {
	constructor(order) {
		super(order);
        
		//disable zoom and movement
		this.SetZoom = () => {};
		this.AddZoom = () => {};
		this.SetOffset = () => {};
		this.MoveOffset = () => {};
	}
}
