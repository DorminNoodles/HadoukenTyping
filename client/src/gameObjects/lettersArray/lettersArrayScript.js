import Script from '../../core/script';


class LettersArrayScript extends Script {

	constructor(length) {
		super();

		this.width = 96;
		this.height = 142;
		this.nbSections = 4;
		this.array = Array(8);

		this.nextMove = 500;

		this.addListener('addBarSection', () => {
			this.nbSections++;
		});

		this.addListener('spawnLetter', (data) => {
			console.log("data :", data);
			this.addLetter(data.detail.letter);
		})

	}

	addLetter(letter) {
		this.array.push(letter);
	}

	getLetterPos(letter) {
		// for (let i = 0; i < this.array.length; i++) {
		// 	console.log("HELLO");
		// }
	}

	update() {


		if (this.nextMove < Date.now()) {
			this.nextMove = Date.now() + 1800;
			this.moveLetters();
		}

	}

	moveLetters() {

		for (let i = 0; i < this.array.length; i++) {
			if (this.array[i] != null) {
				if (i > 0) {
					if (this.array[i - 1] == null) {
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
