document.addEventListener("DOMContentLoaded", function(e) {
	board.update();
});

let aiWhite = new AI(DISK_WHITE);
let aiBlack = new AI(DISK_BLACK);

setInterval(function() {
	aiBlack.place();
}, 1000);
setTimeout(function() {
	setInterval(function() {
		aiWhite.place();
	}, 1000);
}, 500);
