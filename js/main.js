document.addEventListener("DOMContentLoaded", function(e) {
	let playerBlack = new Player(DISK_BLACK);
	let playerWhite = new Player(DISK_WHITE);

	const interval = 0;

	const black = function() {
		if(playerBlack.place()) {
			setTimeout(white, interval);
		}else{
			setTimeout(black, interval);
		}
	}
	const white = function() {
		if(playerWhite.place()) {
			setTimeout(black, interval);
		}else{
			setTimeout(white, interval);
		}
	}

	black();
});
