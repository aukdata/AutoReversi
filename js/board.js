const DISK_NULL = 0;
const DISK_BLACK = 1;
const DISK_WHITE = -1;

const SQUARE_COUNT = 100;
const SQUARE_SIZE = 600 / SQUARE_COUNT;

class Board {
	constructor() {
		this._ctx = null;

		this._squares = new Array(SQUARE_COUNT);
		for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
			this._squares[y] = new Array(SQUARE_COUNT);
			for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
				this._squares[y][x] = DISK_NULL;
			}
		}

		this._squares[Math.floor(SQUARE_COUNT / 2) - 1][Math.floor(SQUARE_COUNT / 2) - 1] = DISK_BLACK;
		this._squares[Math.floor(SQUARE_COUNT / 2)][Math.floor(SQUARE_COUNT / 2) - 1] = DISK_WHITE;
		this._squares[Math.floor(SQUARE_COUNT / 2) - 1][Math.floor(SQUARE_COUNT / 2)] = DISK_WHITE;
		this._squares[Math.floor(SQUARE_COUNT / 2)][Math.floor(SQUARE_COUNT / 2)] = DISK_BLACK;

		const that = this;
		document.addEventListener("DOMContentLoaded", function(e) {
			let canvas = document.getElementById("board");
			canvas.width = 600;
			canvas.height = 600;
			that._ctx = canvas.getContext("2d");
			that.update();
		});
	}

	update() {
		this.render();

		let counter = [0, 0, 0];
		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				++counter[this.get(x, y) + 1];
			}
		}

		$("#counter").text("●x" + counter[DISK_BLACK + 1] + "	○x" + counter[DISK_WHITE + 1]);
	}

	render() {
		this._ctx.clearRect(0, 0, 600, 600);

		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				this._ctx.fillStyle = "green";
				this._ctx.fillRect(x * SQUARE_SIZE + 1, y * SQUARE_SIZE + 1, SQUARE_SIZE - 1, SQUARE_SIZE - 1);

				let state = this._squares[y][x];
				if(state == DISK_BLACK) {
					this._ctx.fillStyle = "black";
					this._ctx.beginPath();
					this._ctx.arc(x * SQUARE_SIZE + SQUARE_SIZE / 2, y * SQUARE_SIZE + SQUARE_SIZE / 2 , SQUARE_SIZE / 2 - SQUARE_SIZE / 10, 0, Math.PI * 2, true);
					this._ctx.fill();
				}else if(state == DISK_WHITE) {
					this._ctx.fillStyle = "white";
					this._ctx.beginPath();
					this._ctx.arc(x * SQUARE_SIZE + SQUARE_SIZE / 2, y * SQUARE_SIZE + SQUARE_SIZE / 2 , SQUARE_SIZE / 2 - SQUARE_SIZE / 10, 0, Math.PI * 2, true);
					this._ctx.fill();
				}
			}
		}
	}

	set(x, y, state) {
		if(0 <= x && x < SQUARE_COUNT && 0 <= y && y < SQUARE_COUNT) {
			board._squares[y][x] = state;
		}
 	}
	get(x, y) {
		if(0 <= x && x < SQUARE_COUNT && 0 <= y && y < SQUARE_COUNT) {
			return board._squares[y][x];
		}else{
			return DISK_NULL;
		}
	}

	place(x, y, state) {
		if(this.get(x, y) != DISK_NULL) return false;

		this.set(x, y, state);

		for(let i = 0 ; i < 8 ; ++i) {
			let count = 0;
			let cpos = {x: x, y: y};

			while(true) {
				cpos = shift(cpos.x, cpos.y, i);
				const cstate = this.get(cpos.x, cpos.y);

				if(cstate == state) break;
				if(cstate == DISK_NULL) {
					count = 0;
					break;
				}
				++count;
			}

			cpos = {x: x, y: y};
			if(count > 0) {
				for(let j = 0 ; j < count ; ++j) {
					cpos = shift(cpos.x, cpos.y, i);
					this.set(cpos.x, cpos.y, state);
				}
			}
		}

		this.update();
		return true;
	}

	getOpponent(state) {
		if(state == DISK_BLACK) {
			return DISK_WHITE;
		}else if(state == DISK_WHITE) {
			return DISK_BLACK;
		}else{
			return DISK_NULL;
		}
	}

	getObtainableCount(x, y, state) {
		if(this.get(x, y) != DISK_NULL) return 0;

		let maxcount = 0;

		for(let i = 0 ; i < 8 ; ++i) {
			let count = 0;
			let cpos = {x: x, y: y};

			while(true) {
				cpos = shift(cpos.x, cpos.y, i);
				const cstate = this.get(cpos.x, cpos.y);

				if(cstate == state) break;
				if(cstate == DISK_NULL) {
					count = 0;
					break;
				}
				++count;
			}
			maxcount += count;
		}
		return maxcount;
	}

	canPlace(x, y, state) {
		return this.getMaxObtainableCount(x, y, state) > 0;
	}

	getNumber(state) {
		let counter = 0;
		for(let x = 0 ; x < SQUARE_COUNT ; ++x) {
			for(let y = 0 ; y < SQUARE_COUNT ; ++y) {
				++counter;
			}
		}
		return counter;
	}
}

let board = new Board();
