import { animFlash } from './anim/animFlash';
import letterScoreUI from './letterScoreUI';
import GameObject from './gameObject';
import RenderText from './renderText';
import Render from './render';
import Script from './script';

class LetterScript extends Script {

	constructor(position, letter, gameObject) {
		super();
		this.gameObjectId = gameObject.id;
		this.begin = Date.now();
		this.speedRefresh = 1000/60;
		this.nextRefresh = 0;
		this.moveSpeed = 10;
		this.state = this.drop;
		this.position = position;
		this.letter = letter;
		this.deadMove = -20;
		this.gameObject = gameObject;
		this.onBoardSpeed = -50;
		this.dropSpeed = 40;
		this.isStone = false;
		this.stoneLife = 19;
	}

	update() {

		if (this.nextRefresh < Date.now()) {
			this.nextRefresh = Date.now() + this.speedRefresh;
			this.state();
		}
		// console.log(this.letter, "   ", this.position);
	}

	drop() {
		this.vulnerable = false;
		if (this.object.y < 500) {
			this.object.move(0, this.dropSpeed);
		}

		if (this.object.y > 500 ) {
			this.object.setPosition(this.object.x, 500);
			this.state = this.onBoard;
			this.vulnerable = true;
		}
	}

	onBoard() {
		let destination = (this.position * 82) + 200;
		if (this.object.x > destination)
			this.object.move(this.onBoardSpeed, 0);

		if (this.object.x < destination)
			this.object.x = destination;
	}

	dead() {
		this.object.move(0, this.deadMove);
		this.deadMove += 5;
	}

	stone() {


		if (!this.isStone) {
			this.isStone = true;
			this.object.render.changeAnim('stone01');
		}

		if (this.stoneLife == 18)
			this.object.render.changeAnim('stone02');
		if (this.stoneLife == 17)
			this.object.render.changeAnim('stone03');
		if (this.stoneLife == 16)
			this.object.render.changeAnim('stone04');
		if (this.stoneLife == 15)
			this.object.render.changeAnim('stone05');
		if (this.stoneLife == 14)
			this.object.render.changeAnim('stone06');
		if (this.stoneLife == 13)
			this.object.render.changeAnim('stone07');
		if (this.stoneLife == 12)
			this.object.render.changeAnim('stone08');
		if (this.stoneLife == 11)
			this.object.render.changeAnim('stone09');
		this.stoneLife--;

	}

	getStoneLife() {
		return this.stoneLife;
	}

	deleteLetter(withScore) {

		let currentScore = (withScore) ? 100 : 0;

		let eventDelete = new CustomEvent("deleteLetter", {
			detail : {
				'score': currentScore,
				'x' : this.object.x,
				'y' : this.object.y,
				'active' : withScore
			},
			"bubbles":true,
			"cancelable":false
		});
		document.dispatchEvent(eventDelete);

		if (withScore) {
			let scoreEvent = new CustomEvent("addScore", {
				detail : {
					'score': 100
				},
				"bubbles":true,
				"cancelable":false
			});
			document.dispatchEvent(scoreEvent);
		}

		this.gameObject.render.changeAnim('flash');
		this.state = this.dead;

		let flashKill = new GameObject('animFlash');
		flashKill.setPosition(this.object.x - 160, this.object.y - 180);
		flashKill.render = new Render('./flashAnim.png');
		flashKill.render.addAnim(animFlash);

		if (withScore) {
			let eventLetterScoreUI = new CustomEvent("showLetterScore", {
				detail : {
					'x' : this.object.x,
					'y' : this.object.y,
				}
			});
			document.dispatchEvent(eventLetterScoreUI);
		}

		setTimeout(() => {
			GameObject.delete(flashKill);
		}, 400);

		setTimeout(() => {
			GameObject.delete(this.gameObject);
		}, 1200);
	}

	isVulnerable() {
		return this.vulnerable;
	}

	changePosition() {
		if (this.position > 0)
			this.position--;
	}
}

export default LetterScript;
