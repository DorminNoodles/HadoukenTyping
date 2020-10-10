import BoardScript from './boardScript';
import GameObject from '../../core/gameObject';
import RenderText from '../../renderText';
import Render from '../../render';
import BeginSection from './beginSection';
import EndSection from './endSection';
import Section from './section';
import LetterStd from '../letterStandard/letterStandard';

class Board extends GameObject {

	constructor(name) {
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
		this.letterNb = 0;
		this.lettersSlot = [];
		this.addListener('keydown', (e) => this.deleteLetter(e, this));
		this.maxLetters = 10;
		this.nbLetter = 0;
	}

	deleteLetter(e, self) {
		console.log("Delete Letter");
		if (e.key && self.lettersSlot[0]) {
			console.log('letter slot ', self.lettersSlot[0].letter);
			if (e.key.toUpperCase() === self.lettersSlot[0].letter.sign) {
				console.log("delete ! it's OK");
				GameObject.delete(self.lettersSlot[0].letter);
				self.lettersSlot[0].letter = null;
				self.nbLetter--;
			}
		}
	}

	update() {
		this.spawnLetter(this.spawnLetterInterval);

		//move letter in left slot if it's possible
		// console.log("2312111: begin", this.lettersSlot.length);
		this.lettersSlot.forEach((slot, index) => {
			// console.log("324231: index slot > ", slot);
			if (index > 0) {
				if (slot.letter && this.lettersSlot[index - 1].letter === null) {
					// console.log("342342: go left");
					this.lettersSlot[index - 1].letter = this.lettersSlot[index].letter;
					this.lettersSlot[index].letter = null;
					//new position where letter must to go
					this.lettersSlot[index - 1].letter.setTargetPos(140 + (92*(index - 1)));
				}
			}
		})
	}

	spawnLetter(interval) {
		let lettersSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		let sign = this.getRandomIntBetween(0,6);

		if (this.nextSpawnLetterTime < Date.now()) {
			this.nextSpawnLetterTime = Date.now() + interval;

			let l = this.addGameObject(new LetterStd('letter' + this.letterNb, lettersSign[sign]))
			l.setLocalPosition(1062, 35);
			l.targetPos = 1062;
			this.letters.push(l);

			this.insertNewLetter(l);
			this.nbLetter++;

		}


		// if (this.nbLetter <= this.maxLetters) {
		// 	if (this.nextSpawnLetterTime < Date.now()) {
		// 		console.log("43948: SPAWN LETTER");
		// 		this.nextSpawnLetterTime = Date.now() + interval;
		// 		let l = this.addGameObject(new LetterStd('letter' + this.letterNb, lettersSign[sign]))
		// 		l.setLocalPosition(1062, 35);
		// 		l.targetPos = 1062;
		// 		this.letters.push(l);

		// 		this.insertNewLetter(l);
		// 		this.nbLetter++;
		// 	}
		// }
	}

	//When letter spawn it push in free slot
	insertNewLetter(letter) {

		for (let i = 0; i < this.lettersSlot.length; i++) {
			// const element = this.lettersSlot[i];
			if (!this.lettersSlot[i].letter) {
				letter.setTargetPos(140 + (92*i));
				this.lettersSlot[i].letter = letter;
				return;
			}
		}
		letter.setTargetPos(140 + (92*this.lettersSlot.length));
		this.lettersSlot.push({
			letter: letter,
		});
	}

	getRandomIntBetween(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
}

export default Board;
