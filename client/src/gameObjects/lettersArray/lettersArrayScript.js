import Script from '../../script';


class LettersArrayScript extends Script {

	constructor() {
		super();

		this.width = 96;
		this.height = 142;
		this.nbSections = 1;
		this.array = new Array(8);


		this.nextMove = 500;
	}

	addLetter(letter) {
		if (this.array[this.array.length - 1] == null) {
			console.log("ENTER ADDLETTTER : ", this.array.length - 1);
			this.array[this.array.length - 1] = letter;
			return true;
		}
		else
			return false;
	}

	getLetterPos(letter) {
		for (let i = 0; i < this.array.length; i++) {
			console.log("HELLO");
		}
	}

	update() {
		// console.log("pouet");
		// console.log(this.array);
		// console.log("pouet");

		if (this.nextMove < Date.now()) {
			this.nextMove = Date.now() + 500;
			this.moveAllLetters();
		}
	}

	moveAllLetters() {

		for (let i = 0; i < this.array.length; i++) {
			if (this.array[i] != null) {
				if (i > 0) {
					if (this.array[i - 1] == null) {
						console.log("from : ", i, "to : ", i - 1);
						this.array[i - 1] = this.array[i];
						this.array[i] = null;
					}
				}
			}
		}

		console.log("start");
		let o = 0;
		this.array.forEach((elem) => {
			o++;
			console.log(o);
			if (elem)
				console.log("OBJECT");
		})
		console.log("end");
	}

}

export default LettersArrayScript;
