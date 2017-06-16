class AI {
	constructor(mydisk) {
		this._disk = mydisk;
	}

	place() {
		let candidates = [];

		for(let x = 0 ; x < SIZE ; ++x) {
			for(let y = 0 ; y < SIZE ; ++y) {
				const obtainable = board.getObtainableCount(x, y, this._disk);
				if(obtainable > 0) {
					candidates.push({x: x, y: y, obtainable: obtainable});
				}
			}
		}

		if(candidates.length > 0) {
			const candidate = candidates[Math.floor(Math.random() * candidates.length)];
			board.place(candidate.x, candidate.y, this._disk);
			return true;
		}else{
			return false;
		}
	}
}
