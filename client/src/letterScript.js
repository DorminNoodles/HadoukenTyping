import { animFlash } from '../anim/animFlash';
import BoardScoreUI from './boardScoreUI';
import GameObject from './gameObject';
import RenderText from './renderText';
import Render from './render';

class LetterScript {

	constructor(position, letter, gameObject) {
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
	}

	update() {

		if (this.nextRefresh < Date.now()) {
			this.nextRefresh = Date.now() + this.speedRefresh;
			this.state();
		}
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
		// console.log("id : ", this.gameObjectId, "   position : ", this.position, "     destination : ", destination);
		if (this.object.x > destination) {
			this.object.move(this.onBoardSpeed, 0);
		}

		if (this.object.x < destination) {
			this.object.x = destination;
		}
	}

	dead() {
		this.object.move(0, this.deadMove);
		this.deadMove += 5;

		// console.log("DEAD !!!!");
	}

	deleteLetter() {

		// let scoreEvent = new Event("addScore", {"bubbles":true, "cancelable":false});
		let scoreEvent = new CustomEvent("addScore", {
			detail : {
				'score': 100
			},
			"bubbles":true,
			"cancelable":false
		});
		document.dispatchEvent(scoreEvent);

		this.gameObject.render.changeAnim('flash');

		this.state = this.dead;

		let flashKill = new GameObject('animFlash');
		flashKill.setPosition(this.object.x - 160, this.object.y - 180);
		flashKill.render = new Render('./flashAnim.png');
		flashKill.render.addAnim(animFlash);



		let score = new GameObject('score');
		score.setPosition(this.object.x, this.object.y);
		score.renderText = new RenderText('./gameFont1.png', "100", 15, 46);
		score.addScript(new BoardScoreUI());


		setTimeout(() => {
			GameObject.delete(score);
		}, 1000);

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
		this.position--;
	}
}

export default LetterScript;
