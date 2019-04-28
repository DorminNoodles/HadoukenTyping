import { playAgainSelected, playAgainGrey, menuSelected, menuGrey } from './anim/animEndBtn';
import GameObject from './gameObject';
import Render from './render';
import Script from './script';


class EndMenuScript extends Script{

	constructor(username) {

		// console.log("Create end menu");
		super();

		this.username = username;

		this.playAgainBtn = this.newObject(new GameObject('playAgainBtn'));
		this.playAgainBtn.render = new Render('./btnEndScore.png');
		this.playAgainBtn.render.addAnim(playAgainSelected);
		this.playAgainBtn.render.addAnim(playAgainGrey);
		this.playAgainBtn.setPosition(680, 800);

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
			this.changeBtn(this.pos);
		});

		this.addListener('keydown', (e) => {
			if (e.keyCode == 13) {
				this.pressEnter();
			}
		})
	}

	update() {

	}

	changeBtn(pos) {
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
		if (this.pos == 0) {
			// console.log("EVENT SOLOGAME");
			let soloGameStart = new CustomEvent('SoloGameStart', {'detail': {'username': this.username}});
			document.dispatchEvent(soloGameStart);
		}
		if (this.pos == 1) {
			console.log("SOLOGAME START");
			let soloGameStart = new CustomEvent('OpenMainMenu', {'detail': {'username': this.username}});
			document.dispatchEvent(soloGameStart);
		}
	}
}

export default EndMenuScript;
