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

	constructor(name, playerControl = true, iaControl = false) {
		console.log("23111: Create Board");
		super(name);
		this.beginSection = this.addGameObject(new BeginSection('beginSection'));
		this.beginSection.setLocalPosition(0, 0);

		this.sections = [];
		for (let i = 0; i < 13; i++) {
			this.sections[i] = this.addGameObject(new Section('section'+i));
			this.sections[i].setLocalPosition(134 + (i * 92), 0);
		}

		this.endSection = this.addGameObject(new EndSection('endSection'));
		this.endSection.setLocalPosition(134+(13*92), 0);

		this.startTime = Date.now();
		this.spawnLetterInterval = 500;
		this.nextSpawnLetterTime = this.startTime;
		this.letters = [];
		this.lettersNb = 0;
		this.lettersStack = new Array(14);

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

		this.lose = false;
		this.lettersLimit = 13;
		this.isFreeze = false;

		this.moveLeftTimer = Date.now();
		this.state = 'idle';
		this.lettersTotal = 40;
		this.lettersDelete = 0;
	}


	takeDamage(e, self) {
		// if (e.detail != self.id) {
		// 	this.nextSpawnLetterTime = 1;
		// }

	}

	launchAttack() {
		var event = new CustomEvent('attack', {'detail': this.id});
		document.dispatchEvent(event);
		console.log("4rw4r239: launch attack event");
	}

	deleteLetter(e, self) {
		// console.log("321fe: Delete Letter");

		for (let i = 0; i < self.lettersStack.length && i <= 11; i++) {

			// on boucle jusqu a trouver une lettre a delete
			//on saute les lettres lock et les NULL

			if (self.lettersStack[i] && !self.lettersStack[i].lock) {

				// console.log("32jeb: ", e.key, "  ", );
				if (e.key.toUpperCase() === self.lettersStack[i].sign) {
					this.lettersDelete++;

					var event = new CustomEvent('updateProgression', {'detail': {
						lettersDelete: this.lettersDelete,
						lettersTotal: this.lettersTotal,
						player: !this.iaControl,
					}});
					document.dispatchEvent(event);

					self.lettersStack[i].deleteLetter();
					delete self.lettersStack[i];
					self.moveLeftTimer = Date.now() + 300;
					self.reduceLettersNb();
					this.leftAttackLock(i);
					break;
				}
				else {
					self.lettersStack[i].setLock();
					break;
				}
			}

		}
	}

	leftAttackLock(index) {

		for (let i = index-1; i >= 0; i--) {
			if (this.lettersStack[i] && this.lettersStack[i].lock == true) {
				console.log('3321iek : letter lock on left');
				this.lettersStack[i].takeDamage();
				if (this.lettersStack[i].isBroken()) {
					console.log("DELETE LETTER !")
					this.lettersStack[i].deleteLetter();
					delete this.lettersStack[i];
				}
				break;
			}
		}

	}

	// breakDisableLetter() {
	// 	console.log("342eed: ", this.lettersStack[this.currentLetter - 1]);

	// 	if (this.lettersStack[this.currentLetter - 1] && this.currentLetter - 1 >= 0) {
	// 		this.lettersStack[this.currentLetter - 1].deleteLetter();
	// 		delete this.lettersStack[this.currentLetter - 1];
	// 		this.currentLetter--;
	// 	}
	// }



	update() {
		if (!this.isFreeze) {
			this.spawnLetter(this.spawnLetterInterval);

			//move letter in left slot if it's possible
			this.moveLettersToLeft();

			if (this.iaControl)
				this.playIA();

			// if (this.lettersNb >= 11 && !this.deathTimer) {
			// 	console.log("ere32: Hello DEATH !");
			// 	this.deathTimer = this.addGameObject(new DeathTimer('DeathTimer', 5));
			// 	this.deathTimer.setLocalPosition(1000, -40);
			// 	// this.deathTimer.setPosition(0,100);
			// }

			// if (this.deathTimer && this.deathTimer.isFinish()) {
			// 	if (this.lettersReachLimit())
			// 	this.lose = true;
		}
	}

	lettersReachLimit() {
		return this.lettersNb >= this.lettersLimit;
	}

	playIA() {

		if (this.ia.nextPlayTime < Date.now() && this.lettersStack[0]) {
			this.ia.nextPlayTime = Date.now() + this.ia.playInterval;
			this.deleteLetter({key: this.lettersStack[0].sign}, this);
		}
	}

	moveLettersToLeft() {

		// if (this.moveLeftTimer < Date.now()) {
			this.lettersStack.forEach((slot, index) => {

				if (index != 0) {
					if (!this.lettersStack[index - 1]) {
						this.lettersStack[index - 1] = this.lettersStack[index];
						delete this.lettersStack[index];

						if (index - 1 <= 13) {
							this.lettersStack[index - 1].local.y = 35;
							this.lettersStack[index - 1].setTargetPos(140 + (92*(index - 1)));
						}
					}
				}
			})
		// }
	}

	spawnLetter(interval) {
		let lettersSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		let sign = this.getRandomIntBetween(0,lettersSign.length);

		if (this.nextSpawnLetterTime < Date.now() && this.lettersStack[13]) {
			console.log("YOU LOSE");
			this.disable();
			this.nextSpawnLetterTime = Date.now() + 999999999;
			var event = new CustomEvent('endGame', {'detail': {winner: 'player'}});
			document.dispatchEvent(event);
		}

		if (this.nextSpawnLetterTime < Date.now() && !this.lettersStack[13]) {
			console.log("efwo3: spawn letter");
			this.nextSpawnLetterTime = Date.now() + interval;

			let l = this.addGameObject(new LetterStd('letter' + sign, lettersSign[sign]))
			// l.setLocalPosition(1342, -3000);
			l.setLocalPosition(140 + (92*13), 35);

			l.targetPos = 140 + (92*13);
			// this.letters.push(l);

			this.lettersStack[13] = l;

			// this.addLettersNb();
			// this.insertNewLetter(l);
		}
	}

	//When letter spawn it push in free slot
	// insertNewLetter(letter) {
	// 	if (!this.lettersStack[13]) {
	// 		this.lettersStack.push(letter);
	// 	}
	// }

	getRandomIntBetween(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
		}

	isLose() {
		return this.lose;
	}

	freeze() {
		this.isFreeze = true;
		this.letters.forEach((letter) => {
			letter.freeze();
		});
	}

	addLettersNb() {
		this.lettersNb++;
		if (this.name == "MainBoard")
			console.log("3232keo: add letter " + this.lettersNb);
	}
	reduceLettersNb() {
		this.lettersNb--;
		if (this.name == "MainBoard")
			console.log("32oeo2eo: reduce letter " + this.lettersNb);
	}
}

export default Board;
