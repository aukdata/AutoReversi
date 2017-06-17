let aiWhite = new AI(DISK_WHITE);
let aiBlack = new AI(DISK_BLACK);

const interval = 100;

let white, black;
white = function() {
	aiWhite.place();
	setTimeout(black, interval);
}
black = function() {
	aiBlack.place();
	setTimeout(white, interval);
}

white();
