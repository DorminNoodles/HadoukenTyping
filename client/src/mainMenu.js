
export const openMainMenu = () => {

	let gameCanvas = document.getElementById('gameCanvas');
	let solo = document.getElementById('solo');

	gameCanvas.style.animationName = "gameCanvasClose";
	gameCanvas.style.top = "-4000px";

	solo.style.animationName = "soloClose";
	solo.style.top = "200px";

}

export const closeMainMenu = () => {

	console.log("{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}");

}

document.addEventListener('openMenu', () => {
	console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
	openMainMenu();
});
