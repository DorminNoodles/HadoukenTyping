
const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u']

let current = {
	letters: [],
	done: false
}

document.addEventListener('keydown', (event) => {
	console.log(event.key);
	// if (event.key == "m") {
	// 	console.log("BABAR");
	// }

	let i = 0;
	while (i < current.letters.length) {
		if (!current.letters[i].valid)
			break;
		console.log("HELLOOOOOOO");
		i++;
	}
	if (i == current.letters.length)
		return;
	if (event.key == current.letters[i].char)
		current.letters[i].valid = true;
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

current.letters = getLetters(5);

// current.letters[0].valid = true;



// current.letters.forEach((elem) => {
//
// 	//create element
// 	var newDiv = document.createElement("div");
//
// 	var newContent = document.createTextNode(elem.char);
// 	// ajoute le noeud texte au nouveau div créé
// 	newDiv.appendChild(newContent);
// 	newDiv.className += "Letters";
// 	document.body.appendChild(newDiv);
//
// })

function render() {
	var myNode = document.body;
	if (myNode) {
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}

	if (current) {
		current.letters.forEach((elem) => {

			//create element
			var newDiv = document.createElement("div");

			var newContent = document.createTextNode(elem.char);
			// ajoute le noeud texte au nouveau div créé
			newDiv.appendChild(newContent);
			if (elem.valid)
				newDiv.className += "LettersOK";
			else
				newDiv.className += "Letters";
			document.body.appendChild(newDiv);

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
