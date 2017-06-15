const DISK_NULL = 0;
const DISK_BLACK = 1;
const DISK_WHITE = -1;

const SIZE = 16;

class Board {
	constructor() {
		this._squares = new Array(SIZE);
		for(let y = 0 ; y < SIZE ; ++y) {
			this._squares[y] = new Array(SIZE);
			for(let x = 0 ; x < SIZE ; ++x) {
				this._squares[y][x] = DISK_NULL;
			}
		}

		this._squares[SIZE / 2 - 1][SIZE / 2 - 1] = DISK_BLACK;
		this._squares[SIZE / 2][SIZE / 2 - 1] = DISK_WHITE;
		this._squares[SIZE / 2 - 1][SIZE / 2] = DISK_WHITE;
		this._squares[SIZE / 2][SIZE / 2] = DISK_BLACK;

		document.addEventListener("DOMContentLoaded", function(e) {
			const table = window.document.getElementById("board");
			for(let y = 0 ; y < SIZE ; ++y) {
				let tr = window.document.createElement("tr");

				for(let x = 0 ; x < SIZE ; ++x) {
					let th = window.document.createElement("th");
					th.appendChild(window.document.createTextNode("●"));
					th.setAttribute("class", "square");
					th.setAttribute("id", "square_" + y + "_" + x);
					tr.appendChild(th);
				}
				table.appendChild(tr);
			}
			$("#contents").css("width", "" + (50 * SIZE) + "px");

			board.update();
		});
}

	update() {
		for(let x = 0 ; x < SIZE ; ++x) {
			for(let y = 0 ; y < SIZE ; ++y) {
				const id = "#square_" + y + "_" + x;
				const state = this._squares[y][x];

				if(state == DISK_BLACK) {
					$(id).css("color", "black");
				}else if(state == DISK_WHITE){
					$(id).css("color", "white");
				}else{
					$(id).css("color", "green");
				}
			}
		}
	}

	set(x, y, state) {
		if(0 <= x && x < SIZE && 0 <= y && y < SIZE) {
			board._squares[y][x] = state;
		}
 	}
	get(x, y) {
		if(0 <= x && x < SIZE && 0 <= y && y < SIZE) {
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
}

let board = new Board();
