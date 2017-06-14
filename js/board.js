const DISK_NULL = 0;
const DISK_BLACK = 1;
const DISK_WHITE = -1;

class Board {
	constructor() {
		this._squares = [
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_BLACK, DISK_WHITE, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_WHITE, DISK_BLACK, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL],
			[DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL, DISK_NULL],
		];
	}

	update() {
		for(let x=0;x < 8;++x) {
			for(let y=0;y < 8;++y) {
				const id = "#square" + y + x;
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
		if(0 <= x && x < 8 && 0 <= y && y < 8) {
			board._squares[y][x] = state;
		}
 	}
	get(x, y) {
		if(0 <= x && x < 8 && 0 <= y && y < 8) {
			return board._squares[y][x];
		}else{
			return DISK_NULL;
		}
	}

	place(x, y, state) {
		if(this.get(x, y) != DISK_NULL) return false;

		this.set(x, y, state);

		for(let i=0; i < 8; ++i) {
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

		for(let i=0; i < 8; ++i) {
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
