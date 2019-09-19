const io = require('socket.io-client');

import Game from './game';
import Render from './render';
import Core from './core/core';
import Network from './network';
import MainMenu from './mainMenu';
import CreateGame from './createGame';
import GameObject from './core/gameObject';
import RenderManager from './renderManager';
import {closeMainMenu, openMainMenu} from './mainMenu';


// const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
//
//
// let gameState = 'normal';
//
// let game;
//
// let life = 100;
// let enemyLife = 100;
//
// let ryu2;
// let nextTime = 0;
//
// let chronoInterval = 0;
//
// let playersChoice;
//
// let playerChoiceChrono = false;
//
//
// let pageLoad = false;
//
// let shakePattern = [
// 	{x: 4, y: 2},
// 	{x: -10, y: -10},
// 	{x:	10, y: 12},
// 	{x: -4, y: -4}
// ]
//
// let nbLetters = 5;
//
//
// let current = {
// 	letters: [],
// 	start: 0,
// 	done: false
// }
//
// let scores;
// let username;
// let gameStateEvent = new CustomEvent("gameState", {detail : { 'username': username}, bubbles: true, cancelable: false});
//
let player = {
	username: ''
}


// Network.socket.on('getScores', (data) => {
// 	scores = data;
// 	displayScore(data);
// })

// function displayScore(scores) {
//
// 	for (let user in scores) {
// 		let divScores = document.getElementById('scores');
// 		let newDiv = document.createElement('span');
//
// 		newDiv.innerHTML = (parseInt(user) + 1) + ' ' + scores[user].username + ' ' + scores[user].score;
// 		divScores.appendChild(newDiv);
// 	}
// }

// function quitMatch() {
// 	let menu = document.getElementById("againMenu");
//
// 	menu.style.top = "-300px";
// 	menu.style.animationName = "close";
// }
//
// function displayAgainMenu() {
// 	let menu = document.getElementById("againMenu");
//
// 	menu.style.top = "350px";
// 	menu.style.animationName = "open";
// }

// function displayPlayerLife(playerLife) {
// 	let div = document.getElementById('playerLife');
//
// 	let h1 = div.getElementsByTagName("h1");
//
// 	h1[0].innerHTML = life;
// }
//
// function displayEnemyLife() {
// 	let div = document.getElementById('enemyLife');
//
// 	let h1 = div.getElementsByTagName("h1");
//
// 	h1[0].innerHTML = enemyLife;
// }
//
// function displayWin() {
// 	let div = document.getElementById('gameWin');
//
// 	if (!div)
// 		div = document.getElementById('gameLose');
//
// 	let h1 = div.getElementsByTagName("h1");
//
// 	h1[0].innerHTML = "YOU WIN !";
// 	h1[0].id = "gameWin";
// }
//
// function displayLose() {
// 	let div = document.getElementById('gameWin');
//
// 	if (!div)
// 		div = document.getElementById('gameLose');
//
// 	let h1 = div.getElementsByTagName("h1");
//
// 	h1[0].innerHTML = "YOU LOSE !";
// 	h1[0].id = "gameLose";
// }

// function displayPlayersId(list) {
//
// 	let myElements = document.body.getElementsByClassName('playerChoiceButton');
// 	if (myElements) {
// 		let arr = [...myElements];//convert htmlCollection to array
// 		arr.forEach((elem) => {
// 			elem.parentNode.removeChild(elem);
// 		});
// 	}
//
// }
//
// function requestPlayer(id) {
// 	cleanPlayersId();
// 	displayChrono();
// }
//
// function displayChrono() {
// 	let chron = document.getElementById('chrono');
// 	let h3 = chron.getElementsByTagName("h3");
// 	let i = 10;
//
// 	h3[0].innerHTML = i;
//
// 	let inter = setInterval(() => {
// 		playerChoiceChrono = true;
// 		i -= 1;
// 		h3[0].innerHTML = i;
// 		if (i == 0 || gameState == "fight") {
// 			playerChoiceChrono = false;
// 			if (gameState != "fight")
// 				displayPlayersId(playersChoice);
// 			chron.removeChild(h3[0]);
// 			clearInterval(inter);
// 		}
// 	}, 1000);
// }

// function clearChrono() {
// 	let chron = document.getElementById('chrono');
// 	let h3 = chron.getElementsByTagName("h3");
// 	h3[0].innerHTML = '';
// }

// function cleanPlayersId() {
// 	let playersList = document.getElementById('playersList');
// 	let h3 = playersList.getElementsByTagName("h3");
//
// 	h3[0].innerHTML = '';
//
// 	let elems = document.getElementsByClassName("playerChoiceButton");
//
// 	if (elems) {
// 		let arr = [...elems];
// 		arr.forEach((elem) => {
// 			elem.parentNode.removeChild(elem);
// 		});
// 	}
// }

// let x = 0;
// let y = 0;
//
// function redScreen() {
// 	ctx.rect(20, 20, 150, 100);
// 	ctx.fillStyle = "red";
// 	ctx.fill();
// }
//
// function shake() {
// 	let shakeIterator = 0;
// 	let inter = setInterval(() => {
// 		ctx.translate(shakePattern[shakeIterator].x, shakePattern[shakeIterator].y)
// 		shakeIterator += 1;
// 		if (shakeIterator == 4) {
// 			clearInterval(inter);
// 		}
// 	}, 80);
// }

// let gameLoop = setInterval(() => {
//
// 	if (current && checkValid(current.letters) && gameState == 'fight') {
// 		gameState = 'validation';
// 		enemyLife -= 10;
// 		displayEnemyLife();
// 		nextTime = Date.now() + 500;
// 	}
//
// 	if (gameState == 'validation' && Date.now() > nextTime) {
// 		current.letters = getLetters(nbLetters);
// 		gameState = 'fight';
// 		render();
// 	}
// }, 16);

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }
//
// function getLetters(nb) {
// 	let arr = [];
//
// 	for(var i = 0; i < nb; i++){
// 		arr.push({
// 			char: alpha[getRandomInt(26)],
// 			valid: false
// 		});
// 	}
// 	return arr;
// }

// function checkValid(arr) {
// 	let valid = true;
// 	arr.forEach((elm) => {
// 		if (!elm.valid)
// 			valid = false
// 	})
// 	return valid;
// }

// current.letters = getLetters(nbLetters);

// function cleanLetters() {
// 	let myElements = document.body.getElementsByClassName('Letters');
// 	if (myElements) {
// 		let arr = [...myElements];//convert htmlCollection to array
// 		arr.forEach((elem) => {
// 			elem.parentNode.removeChild(elem);
// 		});
// 	}
//
// 	let myElements2 = document.body.getElementsByClassName('LettersOK');
// 	if (myElements2) {
// 		let arr = [...myElements2];//convert htmlCollection to array
// 		arr.forEach((elem) => {
// 			elem.parentNode.removeChild(elem);
// 		});
// 	}
// }



// function takeDamageFeedback() {
// 	ctx.rect(0, 0, 400, 400);
// 	ctx.fillStyle = "white";
// 	ctx.fill();
// }

// function render() {
// 	displayEnemyLife(enemyLife);
// 	displayPlayerLife(life);
// 	cleanLetters();
//
// 	if (current) {
// 		current.letters.forEach((elem) => {
//
// 			let content = document.getElementById('LettersContent');
// 			//create element
// 			var newDiv = document.createElement("div");
//
// 			var newContent = document.createTextNode(elem.char);
// 			// ajoute le noeud texte au nouveau div créé
// 			newDiv.appendChild(newContent);
// 			if (elem.valid)
// 				newDiv.className += "LettersOK";
// 			else
// 				newDiv.className += "Letters";
// 			content.appendChild(newDiv);
// 		})
// 	}
// }

// document.addEventListener("SoloGameStart", (e) => {
//
// 	closeMainMenu();
//
// })

// document.addEventListener("OpenMainMenu", (e) => {
// 	closeGameCanvas();
// 	openMainMenu();
// 	if (game)
// 		game.deleteGame();
// })

// function closeGameCanvas() {
// 	let gameCanvas = document.getElementById('gameCanvas');
//
// 	gameCanvas.style.top = "-4000px";
// 	gameCanvas.style.animationName = 'gameCanvasClose';
// }

function startGame() {

	let gameCanvas = document.getElementById('gameCanvas');
	let game = new GameObject('game');

	gameCanvas.style.display = 'flex';
	gameCanvas.style.top = '0px';
	gameCanvas.width = window.innerWidth;
	gameCanvas.height = window.innerHeight;
	gameCanvas.style.animationName = 'gameCanvasOpen';

	console.log('player > ', player.username);

	game.addScript(new Game(player.username));
}

/* Get and sanitize username */
function saveUsername() {
	let input = document.getElementById("inputUsername");
	let form = document.getElementById("usernameForm");
	let blackDrop = document.getElementById("blackDrop");

	console.log(input.value);

	if (input.value.length > 2 && input.value.length < 30 && input.value.match(/^[A-Za-z]+$/)) {
		blackDrop.style.display = 'none';
		form.style.display = 'none';
		player.username = input.value.toLowerCase()
		myUsername.appendChild(document.createTextNode(input.value.toLowerCase()));
	}
}

function init() {
	console.log("HEY");
	// Bouton de Mode de jeux
	let versus = document.getElementById('versus');
	let solo = document.getElementById('solo');
	let saveBtn = document.getElementById("saveUsernameBtn");

	// /!\ Mode de jeu Versus /!\
	versus.onclick = () => {
		gameState = 'versus';
		document.dispatchEvent(gameStateEvent);
	}
	// /!\ Mode de jeu Solo /!\
	solo.onclick = () => {
		// let soloGameStart = new CustomEvent('SoloGameStart', {'detail': {'username': username}});
		// document.dispatchEvent(soloGameStart);
		startGame();
	}

	saveBtn.onclick = saveUsername;
	//Enable Press Enter on save username input
	document.getElementById("inputUsername")
	.addEventListener("keyup", (event) => {
		if (event.keyCode === 13) {
			console.log("ENTER");
			saveUsername();
		}
	});
}

window.onload = init;

//test_1
// console.log(getLetters(2));
// console.log(getLetters(32));

//test_2
// document.addEventListener('keydown', (event) => {
// });
