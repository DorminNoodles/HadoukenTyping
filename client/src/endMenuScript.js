import { playAgainSelected, playAgainGrey, menuSelected, menuGrey } from '../anim/AnimEndBtn';
import GameObject from './gameObject';
import Render from './render';
import Script from './script';


class EndMenuScript extends Script{

	constructor(username) {
		super();

		this.username = username;

		this.playAgainBtn = this.newObject(new GameObject('playAgainBtn'));
		this.playAgainBtn.render = new Render('./btnEndScore.png');
		this.playAgainBtn.render.addAnim(playAgainSelected);
		this.playAgainBtn.render.addAnim(playAgainGrey);
		this.playAgainBtn.setPosition(680, 800);


		console.log(">>>>>>>>>>>>>", this.object);
		// this.object.addChild(playAgainBtn);

		this.menuBtn = this.newObject(new GameObject('menuBtn'));
		this.menuBtn.render = new Render('./btnEndScore.png');
		this.menuBtn.render.addAnim(menuGrey);
		this.menuBtn.render.addAnim(menuSelected);
		this.menuBtn.setPosition(680, 900);

		this.pos = 0;


		this.addListener('ArrowKey', (e) => {
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
		if (this.pos == 0) {
			let soloGameStart = new CustomEvent('SoloGameStart', {'detail': {'username': this.username}});
			document.dispatchEvent(soloGameStart);
		}
	}


}

export default EndMenuScript;
