let aiWhite = new AI(DISK_WHITE);
let aiBlack = new AI(DISK_BLACK);

const interval = 0;

let white, black;
white = function() {
	aiWhite.place();
	setTimeout(black, interval);
}
black = function() {
	aiBlack.place();
	setTimeout(white, interval);
}

document.addEventListener("DOMContentLoaded", function(e) {
	white();
});
