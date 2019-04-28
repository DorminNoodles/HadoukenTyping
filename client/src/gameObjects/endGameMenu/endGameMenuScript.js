import Script from '../../script';
import GameObject from '../../gameObject';
import Render from '../../render';
import { playAgainSelected, playAgainGrey, menuSelected, menuGrey } from '../../anim/animEndBtn';

class EndGameMenuSript extends Script {

	constructor() {
		super();

		this.pos = 0;

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

		// this.playAgainBtn = this.newObject('playAgainBtn');

		// this.menuBtn = this.newObject();
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

}

export default EndGameMenuSript;
