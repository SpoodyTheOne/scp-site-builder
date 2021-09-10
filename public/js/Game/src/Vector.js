export default class Vector {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;

		/**
		 *
		 * @param {(Number|Vector)} x
		 * @param {Number} y
		 * @returns {Vector}
		 */
		this.div = (x, y) => {
			if (x instanceof Vector) return new Vector(this.x / x.x, this.y / x.y);
			else if (y == undefined) return new Vector(this.x / x, this.y / x);

			return new Vector(this.x / x, this.y / y);
		};

		/**
		 *
		 * @param {(Number|Vector)} x
		 * @param {Number} y
		 * @returns {Vector}
		 */
		this.mult = (x, y) => {
			if (x instanceof Vector) return new Vector(this.x * x.x, this.y * x.y);
			else if (y == undefined) return new Vector(this.x * x, this.y * x);

			return new Vector(this.x * x, this.y * y);
		};

		/**
		 *
		 * @param {(Number|Vector)} x
		 * @param {Number} y
		 * @returns
		 */
		this.add = (x, y) => {
			if (x instanceof Vector) return new Vector(this.x + x.x, this.y + x.y);
			else if (y == undefined) return new Vector(this.x + x, this.y + x);

			return new Vector(this.x + x, this.y + y);
		};

		/**
		 *
		 * @param {(Number|Vector)} x
		 * @param {Number} y
		 * @returns
		 */
		this.sub = (x, y) => {
			if (x instanceof Vector) return new Vector(this.x - x.x, this.y - x.y);
			else if (y == undefined) return new Vector(this.x - x, this.y - x);

			return new Vector(this.x - x, this.y - y);
		};

		/**
		 *
		 * @param {Vector} vector
		 * @returns {Number}
		 */
		this.dot = (vector) => {
			return this.x * vector.x + this.y * vector.y;
		};

		/**
		 * @param {Number} number
		 */
		this.mod = (number) => {
			return new Vector(this.x % number, this.y % number);
		};
	}

	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	get normalized() {
		return new Vector(this.x, this.y).div(this.magnitude);
	}
}
