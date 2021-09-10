import Game from "../Game.js";
import Vector from "../src/Vector.js";
import GameModule from "/js/Game/GameModule.js";

export default class Input extends GameModule {
	constructor(Priority) {
		super("Input Module", "default.input", Priority);

		this.MousePressed = false;
		this.MousePosition = new Vector();

		this.Load = (msg) => {
			msg("Creating input events (1/3)");
			Game.Drawing.Canvas.addEventListener("mousedown", (e) => {
				Game.Events.emit("MouseDown", e.clientX, e.clientY, e.button);

				if (e.button == 0) {
					this.MousePressed = true;
				}
			});

			msg("Creating input events (2/3)");
			Game.Drawing.Canvas.addEventListener("mouseup", (e) => {
				Game.Events.emit("MouseUp", e.clientX, e.clientY, e.button);

				if (e.button == 0) {
					this.MousePressed = false;
				}
			});

			msg("Creating input events (3/3)");
			Game.Drawing.Canvas.addEventListener("mousemove", (e) => {
				Game.Events.emit("MouseMove", e.clientX, e.clientY);

				let PositionAsVector = new Vector(e.clientX, e.clientY);

				if (this.MousePressed) {
					let diff = PositionAsVector.sub(this.MousePosition);

					Game.Events.emit("MouseDrag", diff);
				}

				this.MousePosition = PositionAsVector;
			});

			document.addEventListener("wheel", (e) => {
				Game.Events.emit("Scroll", e.wheelDelta / 500);
			});

			Game.Input = this;
		};
	}
}
