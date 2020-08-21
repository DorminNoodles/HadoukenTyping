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
		this.addScript(new BoardScript());
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
        this.spawnLetterInterval = 2000;
        this.nextSpawnLetterTime = this.startTime;
        this.letters = [];
		this.letterNb = 0;
		this.lettersSlot = new Array(9);
		for (let i = 0; i < this.lettersSlot.length; i++) {
			this.lettersSlot[i] = {
				x: 140 + (92*i),
				letter: null
			};
		}


	}

	update() {
		this.spawnLetter(this.spawnLetterInterval);

		//move letter in left slot if it's possible
		this.lettersSlot.forEach((slot, index) => {
			if (index > 0) {
				if (slot.letter && this.lettersSlot[index-1].letter === null) {
					this.lettersSlot[index - 1].letter = this.lettersSlot[index].letter;
					this.lettersSlot[index].letter = null;
					//new position where letter must to go
					this.lettersSlot[index - 1].letter.targetPos = this.lettersSlot[index - 1].x;
				}
			}
		})
	}

	spawnLetter(interval) {
		let lettersSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		let sign = this.getRandomIntBetween(0,6);

        if (this.nextSpawnLetterTime < Date.now()) {
			console.log("43948: SPAWN LETTER");
			this.nextSpawnLetterTime = Date.now() + interval;
			let l = this.addGameObject(new LetterStd('letter' + this.letterNb, lettersSign[sign]))
			l.setLocalPosition(1062, 35);
			l.targetPos = 1062;
			this.letters.push(l);

			this.insertNewLetter(l);
			this.letterNb++;
        }
	}

	//When letter spawn it push in free slot
	insertNewLetter(l) {
		let lastSlot = this.lettersSlot.length - 1;
		if (this.lettersSlot[lastSlot].letter === null) {
			this.lettersSlot[lastSlot].letter = l;
		}
	}

	getRandomIntBetween(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
}

export default Board;
