class Player {
	constructor(mydisk) {
		this._clicked = false;
		this._waiting = false;
		this._mydisk = mydisk;
		this._ai = new AI(mydisk);

		document.getElementById("board").addEventListener("click", this.onClick.bind(this), false);
	}

	place() {
		let color = "";
		if(this._mydisk == DISK_BLACK) {
			color = "black";
		}else if(this._mydisk == DISK_WHITE){
			color = "white";
		}

		if($("#" + color + "_ai_toggle").prop("checked")) {
			this._ai.place();
			return true;
		}else{
			if(this._clicked) {
				this._clicked = false;
				return true;
			}else{
				this._waiting = true;
				return false;
			}
		}
	}

	onClick(e) {
		if(this._waiting) {
			let rect = e.target.getBoundingClientRect();
			let x = Math.floor((e.clientX - rect.left) / SQUARE_SIZE);
			let y = Math.floor((e.clientY - rect.top) / SQUARE_SIZE);

			if(board.getObtainableCount(x, y, this._mydisk) > 0) {
				board.place(x, y, this._mydisk);
				this._clicked = true;
				this._waiting = false;
			}else{
				log("error")
			}
		}
	}
}
