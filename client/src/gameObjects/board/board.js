import BoardScript from './boardScript';
import GameObject from '../../core/gameObject';
import RenderText from '../../renderText';
import Render from '../../render';
import BeginSection from './beginSection';
import EndSection from './endSection';
import Section from './section';
import LetterStd from '../letterStandard/letterStandard';
import DeathTimer from '../deathTimer';

class Board extends GameObject {

	constructor(name, playerControl = true, iaControl = true) {
		console.log("23111: Create Board");
		super(name);
		this.beginSection = this.addGameObject(new BeginSection('beginSection'));
		this.beginSection.setLocalPosition(0, 0);

		this.sections = [];
		for (let i = 0; i < 10; i++) {
			this.sections[i] = this.addGameObject(new Section('section'+i));
			this.sections[i].setLocalPosition(134 + (i * 92), 0);
		}

		this.endSection = this.addGameObject(new EndSection('endSection'));
		this.endSection.setLocalPosition(134+(10*92), 0);

		this.startTime = Date.now();
		this.spawnLetterInterval = 1600;
		this.nextSpawnLetterTime = this.startTime;
		this.letters = [];
		this.lettersNb = 0;
		this.lettersSlot = new Array(24);
		if (playerControl)
			this.addListener('keydown', (e) => this.deleteLetter(e, this));
		this.maxLetters = 10;

		this.currentLetter = 0;
		this.iaControl = iaControl;

		this.addListener('attack', (e) => this.takeDamage(e, this));
		this.ia = {
			nextPlayTime: Date.now() + 2000,
			playInterval: 2000,
		}
	}


	takeDamage(e, self) {
		console.log("32111d: take damage ", e);
		if (e.detail != self.id)
			this.nextSpawnLetterTime = 1;

	}

	launchAttack() {
		var event = new CustomEvent('attack', {'detail': this.id});
		document.dispatchEvent(event);
		console.log("4rw4r239: launch attack event");
	}

	deleteLetter(e, self) {
		console.log("321fe: Delete Letter");
		if (e.key && self.lettersSlot[self.currentLetter]) {
			console.log("4j44j: >>>>>>>>> ", self.lettersSlot);
			// console.log('letter slot ', self.lettersSlot[0].sign);
			if (e.key.toUpperCase() === self.lettersSlot[self.currentLetter].sign) {
				self.lettersSlot[self.currentLetter].deleteLetter();
				delete self.lettersSlot[self.currentLetter];
				this.lettersNb--;

				this.launchAttack();
				this.breakDisableLetter();
			}
			else {
				this.currentLetter++;
			}
		}
	}

	breakDisableLetter() {
		console.log("342eed: ", this.lettersSlot[this.currentLetter - 1]);

		if (this.lettersSlot[this.currentLetter - 1] && this.currentLetter - 1 >= 0) {
			this.lettersSlot[this.currentLetter - 1].deleteLetter();
			delete this.lettersSlot[this.currentLetter - 1];
			this.currentLetter--;
		}
		// if (this.letter)
	}



	update() {
		this.spawnLetter(this.spawnLetterInterval);

		//move letter in left slot if it's possible

		this.moveLettersToLeft();

		if (this.iaControl)
			this.playIA();

		// console.log("313hhz: ", this.lettersNb);
		if ( !this.deathTimer) {
			console.log("ere32: Hello DEATH !");
			this.deathTimer = this.addGameObject(new DeathTimer('DeathTimer', 5));
			this.deathTimer.setLocalPosition(600, -60);
			// this.deathTimer.setPosition(0,100);
		}

		// this.lettersSlot.forEach((slot, index) => {
		// 	// console.log("324231: index slot > ", slot);
		// 	if (index > 0) {
		// 	console.log("324231: index slot > ", index);
		// 		if (slot.letter && this.lettersSlot[index - 1].letter === null) {
		// 			console.log("342342: go left");
		// 			this.lettersSlot[index - 1].letter = this.lettersSlot[index].letter;
		// 			this.lettersSlot[index].letter = null;
		// 			//new position where letter must to go
		// 			this.lettersSlot[index - 1].letter.setTargetPos(140 + (92*(index - 1)));
		// 		}
		// 	}
		// 	else if (index === 0) {
		// 		this.lettersSlot[index].letter.setTargetPos(140 + (92*(index)));
		// 	}
		// })
	}

	playIA() {

		if (this.ia.nextPlayTime < Date.now()) {
			this.ia.nextPlayTime = Date.now() + this.ia.playInterval;
			this.deleteLetter({key: this.lettersSlot[0].sign}, this);
		}
	}

	moveLettersToLeft() {
		this.lettersSlot.forEach((slot, index) => {

			if (index != 0) {
				if (!this.lettersSlot[index - 1]) {
					this.lettersSlot[index - 1] = this.lettersSlot[index];
					delete this.lettersSlot[index];

					if (index - 1 <= 10) {
						// console.log("4367ll: ", this.lettersSlot);
						this.lettersSlot[index - 1].local.y = 35;
						this.lettersSlot[index - 1].setTargetPos(140 + (92*(index - 1)));
					}
				}
			}
		})
	}

	spawnLetter(interval) {
		let lettersSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		let sign = this.getRandomIntBetween(0,6);

		if (this.nextSpawnLetterTime < Date.now()) {
			this.nextSpawnLetterTime = Date.now() + interval;

			let l = this.addGameObject(new LetterStd('letter' + this.lettersNb, lettersSign[sign]))
			l.setLocalPosition(1062, -3000);
			l.targetPos = 1062;
			this.letters.push(l);

			this.lettersNb++;
			this.insertNewLetter(l);
		}
	}

	//When letter spawn it push in free slot
	insertNewLetter(letter) {


		// console.log("test undefined > ", this.lettersSlot[23]);

		// letter.setTargetPos(2);
		if (!this.lettersSlot[23]) {
			this.lettersSlot[23] = letter;
		}
	}

	getRandomIntBetween(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
}

export default Board;
