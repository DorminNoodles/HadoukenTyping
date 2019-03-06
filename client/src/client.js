// import Render from './render.js';
import Character from './character.js';//test
// import AnimationManager from './animationManager.js';
import ryuAnim from './ryuAnim.js';
// import  from './node_modules/socket.io-client/dist/socket.io.js';
const io = require('socket.io-client');


let socket = io('http://localhost:8000');

socket.on('connection', () => {
	console.log("SOCKET IO");
});

socket.on('allPlayersId', (data) => {
	console.log(data, "HIHIHIHIHHI");
	displayPlayersId(data);
});

function displayPlayersId(list) {
	let myElements = document.body.getElementsByClassName('playerChoiceButton');
	if (myElements) {
		let arr = [...myElements];//convert htmlCollection to array
		console.log(arr);
		arr.forEach((elem) => {
			elem.parentNode.removeChild(elem);
		});
	}
	console.log(list, "hello5555");
	let div = document.getElementById('playersList');

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
}

console.log(socket, "bordel");

// let idle = new Animation();
// let punch = new Animation2();
// let gameRender = new Render();
// var exampleSocket = new WebSocket("ws://e2r12p13:8000/", "protocolOne");

const run = () => {

	let gameState = 'normal';

	const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

	let nbLetters = 5;

	let current = {
		letters: [],
		done: false
	}

	let canvas = document.getElementById('canvas');
	canvas.width = 1024;
	canvas.height = 512;

	let ctx = canvas.getContext('2d');
	ctx.scale(4,4);


	let gameLoop = setInterval(() => {

		// console.log(gameState);
		if (current && checkValid(current.letters) && gameState == 'normal') {
			gameState = 'validation';
			console.log("OK @@@@@@@@@@@@@@@@@@@@@@");
			setTimeout(() => {
				current.letters = getLetters(nbLetters);
				gameState = 'normal';
				render();
			}, 500);
		}

	}, 16);



	// let inter = idle.drawAnimation(2);

	document.addEventListener('keydown', (event) => {
		console.log(event.key);


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
			if (ryu)
				ryu.changeAnim('punch');
			socket.emit('lettersValid', (data) => {
			  console.log(data); // data will be 'woot'
			});
		}
		render();
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


	displaySocketId();

	function render() {

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

	let ryu = new Character();

	console.log(ryuAnim);

	ryu.addAnimation(ryuAnim);

	// Object.assign(ryu, new AnimationManager());

	console.log(ryu);

	// obj = undefined;
	// arrayOfObject.push(obj);

	// console.log(arrayOfObject, "hehe");


	// obj.render();
	// arrayOfObject[0].render();
}

// window.DOMContentLoaded = run();
//
// const hello = () => {
// 	console.log("hello");
// }

window.onload = run;

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
