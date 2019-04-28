// import Render from './render.js';
// import Character from './character.js';//test
// import AnimationManager from './animationManager.js';
// import ryuAnim from './ryuAnim.js';
// import  from './node_modules/socket.io-client/dist/socket.io.js';
const io = require('socket.io-client');
// const checksum = require('checksum');
// const cs = checksum()
// const fs = require('fs');
//

import RenderManager from './renderManager';
import Core from './core';

import Game from './game';

import GameObject from './gameObject';

import Render from './render';
import Network from './network';

import MainMenu from './mainMenu';
import {closeMainMenu, openMainMenu} from './mainMenu';

const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']


let gameState = 'normal';

let game;

let life = 100;
let enemyLife = 100;

let ryu2;
let nextTime = 0;

let chronoInterval = 0;

let playersChoice;

let playerChoiceChrono = false;


let pageLoad = false;

let shakePattern = [
	{x: 4, y: 2},
	{x: -10, y: -10},
	{x:	10, y: 12},
	{x: -4, y: -4}
]

let nbLetters = 5;


let current = {
	letters: [],
	start: 0,
	done: false
}

let scores;
let username;
let gameStateEvent = new CustomEvent("gameState", {detail : { 'username': username}, bubbles: true, cancelable: false});

// let idle = new Animation();
// let punch = new Animation2();
// let gameRender = new Render();

// let socket = io('http://e2r12p13:8000/');
//
// setInterval(() => {
// 	window.moveBy(5,5);
// }, 100);

//
//
// socket.on('allPlayersId', (data) => {
// 	if (gameState != "fight") {
// 		displayPlayersId(data);
// 	}
// 	playersChoice = data;
// });
//
// socket.on('lose', () => {
// 	console.log("YOU LOSE !");
// 	gameState = 'finish';
// 	cleanLetters();
// 	displayLose();
// 	displayAgainMenu();
// });
//
// socket.on('win', () => {
// 	console.log("YOU WIN !");
// 	gameState = 'finish';
// 	cleanLetters();
// 	displayWin();
// 	displayAgainMenu();
// });
//
// socket.on('fightBegin', () => {
// 	console.log("FIGHT BEGIN !");
// 	ryu2 = new Character(-200,0, true);
// 	ryu2.addAnimation(ryuAnim);
// 	gameState = "fight";
// 	current.start = Date.now();
// 	render();
// });
//
// socket.on('takeDamage', (playerLife) => {
// 	console.log("TAKE DAMAGE !", playerLife);
// 	life = playerLife;
// 	if (ryu2)
// 		ryu2.changeAnim('punch');
// 	displayPlayerLife(life);
// 	shake();
// 	takeDamageFeedback();
// });

Network.socket.on('getScores', (data) => {
	scores = data;
	displayScore(data);
})

function displayScore(scores) {

	for (let user in scores) {
		let divScores = document.getElementById('scores');
		let newDiv = document.createElement('span');

		newDiv.innerHTML = (parseInt(user) + 1) + ' ' + scores[user].username + ' ' + scores[user].score;
		divScores.appendChild(newDiv);
	}
}

function quitMatch() {
	let menu = document.getElementById("againMenu");

	menu.style.top = "-300px";
	menu.style.animationName = "close";
}

function displayAgainMenu() {
	let menu = document.getElementById("againMenu");

	menu.style.top = "350px";
	menu.style.animationName = "open";

}

function displayPlayerLife(playerLife) {
	let div = document.getElementById('playerLife');

	let h1 = div.getElementsByTagName("h1");

	h1[0].innerHTML = life;
}

function displayEnemyLife() {
	let div = document.getElementById('enemyLife');

	let h1 = div.getElementsByTagName("h1");

	h1[0].innerHTML = enemyLife;
}

function displayWin() {
	let div = document.getElementById('gameWin');

	if (!div)
		div = document.getElementById('gameLose');

	let h1 = div.getElementsByTagName("h1");

	h1[0].innerHTML = "YOU WIN !";
	h1[0].id = "gameWin";
}

function displayLose() {
	let div = document.getElementById('gameWin');

	if (!div)
		div = document.getElementById('gameLose');

	let h1 = div.getElementsByTagName("h1");

	h1[0].innerHTML = "YOU LOSE !";
	h1[0].id = "gameLose";
}

function displayPlayersId(list) {

	let myElements = document.body.getElementsByClassName('playerChoiceButton');
	if (myElements) {
		let arr = [...myElements];//convert htmlCollection to array
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}

}

function requestPlayer(id) {
	cleanPlayersId();
	displayChrono();
}

function displayChrono() {
	let chron = document.getElementById('chrono');
	let h3 = chron.getElementsByTagName("h3");
	let i = 10;

	h3[0].innerHTML = i;

	let inter = setInterval(() => {
		playerChoiceChrono = true;
		i -= 1;
		h3[0].innerHTML = i;
		if (i == 0 || gameState == "fight") {
			playerChoiceChrono = false;
			if (gameState != "fight")
				displayPlayersId(playersChoice);
			chron.removeChild(h3[0]);
			clearInterval(inter);
		}
	}, 1000);
}

// function clearChrono() {
// 	let chron = document.getElementById('chrono');
// 	let h3 = chron.getElementsByTagName("h3");
// 	h3[0].innerHTML = '';
// }

function cleanPlayersId() {
	let playersList = document.getElementById('playersList');
	let h3 = playersList.getElementsByTagName("h3");

	h3[0].innerHTML = '';

	let elems = document.getElementsByClassName("playerChoiceButton");

	if (elems) {
		let arr = [...elems];
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}
}

let x = 0;
let y = 0;

function redScreen() {
	ctx.rect(20, 20, 150, 100);
	ctx.fillStyle = "red";
	ctx.fill();
}

function shake() {
	let shakeIterator = 0;
	let inter = setInterval(() => {
		ctx.translate(shakePattern[shakeIterator].x, shakePattern[shakeIterator].y)
		shakeIterator += 1;
		if (shakeIterator == 4) {
			clearInterval(inter);
		}
	}, 80);
}

let gameLoop = setInterval(() => {

	if (current && checkValid(current.letters) && gameState == 'fight') {
		gameState = 'validation';
		enemyLife -= 10;
		displayEnemyLife();
		nextTime = Date.now() + 500;
	}

	if (gameState == 'validation' && Date.now() > nextTime) {
		current.letters = getLetters(nbLetters);
		gameState = 'fight';
		render();
	}
}, 16);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getLetters(nb) {
	let arr = [];

	for(var i = 0; i < nb; i++){
		arr.push({
			char: alpha[getRandomInt(26)],
			valid: false
		});
	}
	return arr;
}

function checkValid(arr) {
	let valid = true;
	arr.forEach((elm) => {
		if (!elm.valid)
			valid = false
	})
	return valid;
}

current.letters = getLetters(nbLetters);

function cleanLetters() {
	let myElements = document.body.getElementsByClassName('Letters');
	if (myElements) {
		let arr = [...myElements];//convert htmlCollection to array
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}

	let myElements2 = document.body.getElementsByClassName('LettersOK');
	if (myElements2) {
		let arr = [...myElements2];//convert htmlCollection to array
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}
}

function displaySocketId() {
	// let newDiv = document.createElement("div");
	//
	// let newContent = document.createTextNode("My id: " + socket.id);
	//
	// newDiv.appendChild(newContent);
	// document.getElementById("myId").appendChild(newDiv);
	//
}

function takeDamageFeedback() {
	ctx.rect(0, 0, 400, 400);
	ctx.fillStyle = "white";
	ctx.fill();
}


function render() {
	displayEnemyLife(enemyLife);
	displayPlayerLife(life);
	cleanLetters();

	if (current) {
		current.letters.forEach((elem) => {

			let content = document.getElementById('LettersContent');
			//create element
			var newDiv = document.createElement("div");

			var newContent = document.createTextNode(elem.char);
			// ajoute le noeud texte au nouveau div créé
			newDiv.appendChild(newContent);
			if (elem.valid)
				newDiv.className += "LettersOK";
			else
				newDiv.className += "Letters";
			content.appendChild(newDiv);
		})
	}
}

document.addEventListener("SoloGameStart", (e) => {

	// console.log("HERE START");
	closeMainMenu();

	let gameCanvas = document.getElementById('gameCanvas');

	gameCanvas.style.display = 'flex';
	gameCanvas.style.top = '0px';
	gameCanvas.width = window.innerWidth;
	gameCanvas.height = window.innerHeight;
	gameCanvas.style.animationName = 'gameCanvasOpen';

	// if (game) {
	// 	game.deleteGame();
	// }
	game = new GameObject('game');
	game.addScript(new Game(e.detail.username));
	// game = new gameObject('game', e.detail.username);
})

document.addEventListener("OpenMainMenu", (e) => {
	closeGameCanvas();
	openMainMenu();
	if (game)
		game.deleteGame();
})

function closeGameCanvas() {
	let gameCanvas = document.getElementById('gameCanvas');

	gameCanvas.style.top = "-4000px";
	gameCanvas.style.animationName = 'gameCanvasClose';
}

// document.addEventListener("gameState", (e) => {
//
//
// 	if (gameState == 'solo' && username) {
// 		game = new Game('solo', username);
// 	}
// })

// document.addEventListener('openMenu', () => {
// 	game.deleteGame();
// });

// document.addEventListener("gameState", (e) => {
//
// 	let gameCanvas = document.getElementById('gameCanvas');
// 	let versus = document.getElementById('versus');
// 	let solo = document.getElementById('solo');
//
// 	gameCanvas.style.display = 'flex';
//
// 	versus.style.top = '-400px';
// 	versus.style.animationName = 'versusClose';
//
// 	solo.style.top = '-1000px';
// 	solo.style.animationName = 'soloClose';
//
// 	gameCanvas.style.top = '0px';
// 	gameCanvas.width = window.innerWidth;
// 	gameCanvas.height = window.innerHeight;
// 	gameCanvas.style.animationName = 'gameCanvasOpen';
// })

function startGame() {

	let gameCanvas = document.getElementById('gameCanvas');

	// game = new Game('solo', username);

}


function init() {

	let versus = document.getElementById('versus');

	versus.onclick = () => {
		gameState = 'versus';
		document.dispatchEvent(gameStateEvent);
	}

	let solo = document.getElementById('solo');

	solo.onclick = () => {

		let soloGameStart = new CustomEvent('SoloGameStart', {'detail': {'username': username}});
		document.dispatchEvent(soloGameStart);
	}

	document.getElementById("clickPlayBtn").onclick = saveUsername;

	pageLoad = true;
}

function saveUsername() {

	let input = document.getElementById("inputUsername");
	let form = document.getElementById("usernameForm");
	let blackDrop = document.getElementById("blackDrop");

	if (input.value.length > 2 && input.value.length < 30 && input.value.match(/^[A-Za-z]+$/)) {
		blackDrop.style.display = 'none';
		form.style.display = 'none';
		username = input.value.toLowerCase()
		myUsername.appendChild(document.createTextNode(input.value.toLowerCase()));
	}
}

window.onload = init;



document.addEventListener('SoloGameStart', () => {

})

//test_1
// console.log(getLetters(2));
// console.log(getLetters(32));

//test_2
// document.addEventListener('keydown', (event) => {
// });
