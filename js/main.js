document.addEventListener("DOMContentLoaded", function(e) {
	let playerWhite = new Player(DISK_WHITE);
	let playerBlack = new Player(DISK_BLACK);

	const interval = 0;

	const white = function() {
		if(playerWhite.place()) {
			setTimeout(black, interval);
		}else{
			setTimeout(white, interval);
		}
	}
	const black = function() {
		if(playerBlack.place()) {
			setTimeout(white, interval);
		}else{
			setTimeout(black, interval);
		}
	}

	black();
});
