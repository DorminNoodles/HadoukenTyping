import Script from '../../script';


class LettersArrayScript extends Script {

	constructor() {
		super();

		this.width = 96;
		this.height = 142;
		this.nbSections = 4;
		this.array = new Array(8);

		this.nextMove = 500;

		this.addListener('addBarSection', () => {
			this.nbSections++;
		});

		this.addListener('spawnLetter', (data) => {

			this.addLetter(data.letter);
			// console.log("FICHTRE NEW LETTER");
		})

	}

	addLetter(letter) {
		if (this.array[this.array.length - 1] == null) {
			this.array[this.array.length - 1] = letter;

			return true;
		}
		else
			return false;
	}

	getLetterPos(letter) {
		// for (let i = 0; i < this.array.length; i++) {
		// 	console.log("HELLO");
		// }
	}

	update() {

		if (this.nextMove < Date.now()) {
			this.nextMove = Date.now() + 1800;
			this.moveAllLetters();
		}

	}

	moveAllLetters() {

		for (let i = 0; i < this.array.length; i++) {
			if (this.array[i] != null) {
				if (i > 0) {
					if (this.array[i - 1] == null) {
						// console.log("from : ", i, "to : ", i - 1);
						this.array[i - 1] = this.array[i];
						this.array[i] = null;
						this.array[i - 1].script.setPosition(i - 1);
					}
				}
			}
		}
	}

}

export default LettersArrayScript;
