
// import dep1 from './dep-1.js';
import Animation from './animation.js';


let ryu = new Animation();

ryu.sayHello();

setInterval(() => {
	ryu.drawImage();
}, 100);


const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u']

let nbLetters = 8;

let current = {
	letters: [],
	done: false
}

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
	if (event.key == current.letters[i].char)
		current.letters[i].valid = true;

	if (current && checkValid(current.letters)) {
		current.letters = getLetters(nbLetters);
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
			char: alpha[getRandomInt(20)],
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
	console.log("return " + valid);
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

function render() {
	// var myNode = document.body;

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

// render();


//test_1
// console.log(getLetters(2));
// console.log(getLetters(32));

//test_2
// document.addEventListener('keydown', (event) => {
// 	console.log(event.key);
// });
