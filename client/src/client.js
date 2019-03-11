// import Render from './render.js';
import Character from './character.js';//test
// import AnimationManager from './animationManager.js';
import ryuAnim from './ryuAnim.js';
// import  from './node_modules/socket.io-client/dist/socket.io.js';
const io = require('socket.io-client');

import renderManager from './renderManager';
// const renderManager = require('./render');

import Game from './game';

import GameObject from './gameObject';

import Render from './render';



const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

let gameState = 'normal';
let life = 100;
let enemyLife = 100;

let ryu2;
let nextTime = 0;

let chronoInterval = 0;

let playersChoice;

let playerChoiceChrono = false;

let ctx;

let pageLoad = false;

let shakePattern = [
	{x: 4, y: 2},
	{x: -10, y: -10},
	{x:	10, y: 12},
	{x: -4, y: -4}
]

let nbLetters = 5;

let username;

let current = {
	letters: [],
	start: 0,
	done: false
}

let scores;

// 2. -8 . 0 . -4

// let idle = new Animation();
// let punch = new Animation2();
// let gameRender = new Render();
let socket = io('http://localhost:8000/');
// let socket = io('http://e2r12p13:8000/');

setInterval(() => {
	window.moveBy(5,5);
	console.log(gameState);
}, 100);


socket.on('connection', () => {
	console.log("SOCKET IO");
});

socket.on('allPlayersId', (data) => {
	console.log(data);
	if (gameState != "fight") {
		displayPlayersId(data);
	}
	playersChoice = data;
});

socket.on('lose', () => {
	console.log("YOU LOSE !");
	gameState = 'finish';
	cleanLetters();
	displayLose();
	displayAgainMenu();
});

socket.on('win', () => {
	console.log("YOU WIN !");
	gameState = 'finish';
	cleanLetters();
	displayWin();
	displayAgainMenu();
});

socket.on('fightBegin', () => {
	console.log("FIGHT BEGIN !");
	ryu2 = new Character(-200,0, true);
	ryu2.addAnimation(ryuAnim);
	gameState = "fight";
	current.start = Date.now();
	render();
});

socket.on('takeDamage', (playerLife) => {
	console.log("TAKE DAMAGE !", playerLife);
	life = playerLife;
	if (ryu2)
		ryu2.changeAnim('punch');
	displayPlayerLife(life);
	shake();
	takeDamageFeedback();
});

socket.on('getScore', (data) => {
	scores = data;
})

function restartMatch() {
	console.log("restart !!!!!");
	// let menu = document.getElementById("againMenuOpen");
	// menu.removeAttribute("id");
	// menu.id = "againMenuClose";
}

function quitMatch() {
	let menu = document.getElementById("againMenu");

	menu.style.top = "-300px";
	menu.style.animationName = "close";
	console.log("QUIT !!!!!");
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

	console.log("DISPLAY PLAYER CHOICE");
	console.log(list);
	let myElements = document.body.getElementsByClassName('playerChoiceButton');
	if (myElements) {
		let arr = [...myElements];//convert htmlCollection to array
		console.log(arr);
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}
	let div = document.getElementById('playersList');

	let h3 = div.getElementsByTagName("h3");

	h3[0].innerHTML = "Choice Player :";

	for (let elem in list) {
		if (elem != socket.id) {
			console.log(elem);
			let newDiv = document.createElement("div");
			newDiv.innerHTML = elem;
			newDiv.className += "playerChoiceButton";
			newDiv.onclick = () => {
				requestPlayer(elem);
			}
			div.appendChild(newDiv);
		}
	}
}

function requestPlayer(id) {
	console.log(id);
	socket.emit('playerRequest', id);
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


console.log(socket, "bordel");



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
	// console.log(Date.now());
	// console.log(gameState);

	if (current && checkValid(current.letters) && gameState == 'fight') {
		gameState = 'validation';
		enemyLife -= 10;
		displayEnemyLife();
		socket.emit('attack');
		nextTime = Date.now() + 500;
	}

	if (gameState == 'validation' && Date.now() > nextTime) {
		current.letters = getLetters(nbLetters);
		gameState = 'fight';
		render();
	}

}, 16);



// let inter = idle.drawAnimation(2);

document.addEventListener('keydown', (event) => {
	console.log(event.key);

	if (gameState == "fight") {
		let i = 0;
		while (i < current.letters.length) {
			if (!current.letters[i].valid)
				break;
			i++;
		}
		if (i == current.letters.length)
			return;
		if (event.key == current.letters[i].char) {
			current.letters[i].valid = true;
		}

		if (current && checkValid(current.letters)) {
			if (ryu1)
				ryu1.changeAnim('punch');
			socket.emit('lettersValid', (data) => {
			  console.log(data);
			});
		}
		render();
	}
});

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
	// console.log("return " + valid);
	return valid;
}

current.letters = getLetters(nbLetters);

function cleanLetters() {
	let myElements = document.body.getElementsByClassName('Letters');
	if (myElements) {
		let arr = [...myElements];//convert htmlCollection to array
		console.log(arr);
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}

	let myElements2 = document.body.getElementsByClassName('LettersOK');
	if (myElements2) {
		let arr = [...myElements2];//convert htmlCollection to array
		console.log(arr);
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}
}

function displaySocketId() {
	let newDiv = document.createElement("div");

	let newContent = document.createTextNode("My id: " + socket.id);

	newDiv.appendChild(newContent);
	document.getElementById("myId").appendChild(newDiv);

	console.log(socket.id);
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

// let ryu1 = new Character(0,0, false);

// console.log(ryuAnim);

// ryu1.addAnimation(ryuAnim);

// Object.assign(ryu, new AnimationManager());

// console.log(ryu1);

function init() {
	let canvas = document.getElementById('canvas');
	canvas.width = 1024;
	canvas.height = 480;

	ctx = canvas.getContext('2d');
	ctx.scale(4,4);

	displaySocketId();

	let againBtn = document.getElementsByClassName("againMenuBtn");
	againBtn[1].onclick = quitMatch;
	againBtn[0].onclick = restartMatch;

	document.getElementById("clickPlayBtn").onclick = saveUsername;

	pageLoad = true;
}

function saveUsername() {

	let input = document.getElementById("inputUsername");
	let form = document.getElementById("usernameForm");

	if (input.value.length > 2) {
		console.log("CLICKAGE PLAY !");
		socket.emit('saveUsername', input.value);
		form.style.display = 'none';
	}

	username = input.value;
}


window.onload = init;

let objet1 = {"hello": 2};
let objet2 = {"hello": 2};


renderManager.addObject(objet1);
renderManager.addObject(objet2);
//
// renderTest.addObject(objet1);
// renderTest.addObject(objet2);
// renderTest.addObject({"souci": "billy"});
// //
//
// let koko = new Game();
//
// renderTest.sayHello();
renderManager.sayHello();

console.log(GameObject.listOfAll());


mushroom.render = new Render();

// obj = undefined;
// arrayOfObject.push(obj);

// console.log(arrayOfObject, "hehe");
// obj.render();
// arrayOfObject[0].render();

// window.DOMContentLoaded = run();
//
// const hello = () => {
// 	console.log("hello");
// }
// setInterval(() => {
//
// })

// render();



//test_1
// console.log(getLetters(2));
// console.log(getLetters(32));

//test_2
// document.addEventListener('keydown', (event) => {
// 	console.log(event.key);
// });
