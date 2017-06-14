class AI {
	constructor(mydisk) {
		this._disk = mydisk;
	}

	place() {
		let pos = {x: -1, y: -1};
		let maxobtainable = 0;

		for(let x=0;x < 8;++x) {
			for(let y=0;y < 8;++y) {
				const obtainable = board.getObtainableCount(x, y, this._disk);
				if(obtainable > maxobtainable) {
					maxobtainable = obtainable;
					pos.x = x;
					pos.y = y;
					log(obtainable, "at",x,y)
				}
			}
		}

		log("max: ",maxobtainable)
		if(maxobtainable > 0) {
			board.place(pos.x, pos.y, this._disk);
			return true;
		}else{
			return false;
		}
	}
}
