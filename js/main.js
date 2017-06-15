let aiWhite = new AI(DISK_WHITE);
let aiBlack = new AI(DISK_BLACK);

setTimeout(function() {
	setInterval(function() {
		aiWhite.place();
	}, 1000);
}, 500);
setTimeout(function() {
	setInterval(function() {
		aiBlack.place();
	}, 1000);
}, 1000);
