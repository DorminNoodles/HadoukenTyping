import { playAgainSelected, playAgainGrey, menuSelected, menuGrey } from '../anim/AnimEndBtn';
import GameObject from './gameObject';
import Render from './render';


class EndMenuScript {

	constructor() {

		this.childs = [];

		this.playAgainBtn = new GameObject('playAgainBtn');
		this.playAgainBtn.render = new Render('./btnEndScore.png');
		this.playAgainBtn.render.addAnim(playAgainSelected);
		this.playAgainBtn.render.addAnim(playAgainGrey);
		this.playAgainBtn.setPosition(640, 900);
		this.childs['playAgainBtn'] = this.playAgainBtn;

		console.log("ID >>>>>> ", this.childs['playAgainBtn'].id);

		console.log(">>>>>>>>>>>>>", this.object);
		// this.object.addChild(playAgainBtn);

		this.menuBtn = new GameObject('menuBtn');
		this.menuBtn.render = new Render('./btnEndScore.png');
		this.menuBtn.render.addAnim(menuGrey);
		this.menuBtn.render.addAnim(menuSelected);
		this.menuBtn.setPosition(640, 1000);
		this.childs['menuBtn'] = this.menuBtn;

		this.pos = 0;

		document.addEventListener('ArrowKey', (e) => {
			if (e.detail.keyCode === 40) {
				this.pos++;
				this.pos = this.pos % 2;
			}
			if (e.detail.keyCode === 38) {
				this.pos--;
				this.pos = (this.pos < 0)? 1 : this.pos;
			}
			// console.log("HERE this pos >>> ", this.pos, '    ', this.gameObjectId);
			this.changeBtn(this.pos);
		});

		document.addEventListener('keydown', (e) => {

			if (e.keyCode == 13)
				this.pressEnter();
		})
	}

	update() {
		// console.log("script END MENU");
	}

	changeBtn(pos) {
		// console.log("CHNAGE  ID ",this.gameObjectId);
		// console.log("CHNAGE ",pos);
		if (pos == 0)
			this.playAgainBtn.render.changeAnim('playAgainSelected');
		else
			this.playAgainBtn.render.changeAnim('playAgainGrey');

		if (pos == 1)
			this.menuBtn.render.changeAnim('menuSelected');
		else
			this.menuBtn.render.changeAnim('menuGrey');
	}

	pressEnter() {
		if (this.pos == 1) {
			let openMenuEvent = new Event('openMenu');
			document.dispatchEvent(openMenuEvent);
		}
	}


}

export default EndMenuScript;
