import Game from "/js/Game/Game.js";
import GameModule from "/js/Game/GameModule.js";

export default class Events extends GameModule {
	constructor(priority) {
		super("Event Module", "default.events", priority);

		/**
		 * Subscribe to an event
		 * @param {String} EventName
		 * Name of the event
		 * @param {Function} Callback
		 * Callback function called when event happens
		 * @returns {Number} Id
		 */
		this.on = (EventName, Callback) => {
			return eventList.add(EventName, Callback);
		};

		/**
		 *
		 * @param {Number} Id
		 * The id of the event
		 */
		this.off = (Id) => {
			this.eventList.remove(Id);
		};

		this.emit = (EventName, ...args) => {
			let list = eventList.events[EventName];
			if (!list) return;

			//console.log(list);

			for (let [id, callback] of Object.entries(list)) {
				callback(...args);
			}
		};

		/**
		 * Called when game is loaded
		 */
		this.Load = (Callback) => {
			Callback("Loaded Events module");
			Game.Events = this;
		};

		let eventList = new EventList();
	}
}

class EventList {
	constructor() {
		/*
        {
            eventName : {
                id: callback1,
                id: callback2,
                etc...
            }
        }
        */
		this.events = {};

		/*
		{
			callback_id: EventName
		}
		*/
		this.IdMap = {};

		/**
		 *
		 * @param {String} event
		 */
		this.CreateIfDontExist = (event) => {
			if (!this.events[event]) this.events[event] = {};
		};

		/**
		 *
		 * @param {string} event
		 * @param {Function} callback
		 */
		this.add = (event, callback) => {
			let id = this.GetRandomId();

			this.CreateIfDontExist(event);
			this.events[event][id] = callback;
			this.IdMap[id] = event;

			return id;
		};

		/**
		 *
		 * @param {String} EventName
		 * @param {Number} Id
		 */
		this.remove = (Id) => {
			let EventName = this.IdMap[Id];
			this.events[EventName][Id] = null;
			if (Object.entries(this.events[EventName]).length == 0) {
				this.events[EventName] = null;
				this.IdMap[Id] = null;
			}
		};

		this.GetRandomId = () => {
			return Math.floor(Math.random() * 999999 - 111111);
		};
	}
}
