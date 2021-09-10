import Game from "/js/Game/Game.js";
import Event from "/js/Game/Modules/Events.js";
import Drawing from "/js/Game/Modules/Drawing.js";
import Input from "./Game/Modules/Input.js";
import LayerManager from "./Game/Modules/LayerManager.js";

/** @type {HTMLProgressElement} */
let ProgressBar = document.querySelector("#Loading .container progress");

/** @type {HTMLHeadElement} */
let ProgressText = document.querySelector("#Loading .container h2");

function LoadProgress(value) {
	ProgressBar.value = value * 100;
}

function LoadMessage(Message) {
	ProgressText.textContent = Message;
}

function RemoveLoadingScreen() {
	document.querySelector("#Loading").classList.add("hidden");
	setTimeout(() => {
		document.querySelector("#Loading").style.display = "none";
	}, 400);
}

window.addEventListener("DOMContentLoaded", (e) => {
	Game.AddModule(new Event(999));
	Game.AddModule(new Drawing(500));
	Game.AddModule(new LayerManager(450));
	Game.AddModule(new Input(400));

	Game.Load(LoadProgress, LoadMessage).then(RemoveLoadingScreen);

	window.Game = Game;
});
