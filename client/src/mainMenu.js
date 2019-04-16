
export const openMainMenu = () => {

	let gameCanvas = document.getElementById('gameCanvas');
	let solo = document.getElementById('solo');

	gameCanvas.style.animationName = "gameCanvasClose";
	gameCanvas.style.top = "-4000px";

	solo.style.animationName = "soloClose";
	solo.style.top = "200px";

}

export const closeMainMenu = () => {

	console.log("Close Main Menu");

	let versus = document.getElementById('versus');
	let solo = document.getElementById('solo');

	console.log("launch gameState Event");
	gameCanvas.style.display = 'flex';

	versus.style.top = '-400px';
	versus.style.animationName = 'versusClose';

	solo.style.top = '-1000px';
	// setTimeout(() => {
	// 	practice.style.display = 'none';
	// }, 1200);
	solo.style.animationName = 'soloClose';
}

// document.addEventListener('openMenu', () => {
// 	console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
// 	openMainMenu();
// });
