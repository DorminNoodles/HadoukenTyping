import GameObject from '../../core/gameObject';
import * as anim from '../../anim/AnimLetter';
import LetterStandardScript from './letterStandardScript';
import Render from '../../render';

// const letterStandard = (position, letter) => {
// 	let obj = new GameObject('letterStandard');

// 	obj.addScript(new LetterStandardScript(position, letter));
// 	// obj.render = new Render('./asianLetters.png');
// 	obj.render = new Render('./boutonLetters.png');
// 	obj.render.addAnim(anim['animA']);
// 	return obj;
// }

class LetterStd extends GameObject {

	constructor(name, sign = 'A') {
		super(name);
		this.addRender(new Render('./images/boutonLetters.png', 40));
		this.render.addAnim(anim['anim'+sign]);
		this.targetPos = 0;
		this.speed = 10;
		this.sign = sign;

		this.state = null;

		this.deleteAnimationStart = 0;
		this.velocity = {
			x: 0.0,
			y: 0.0,
		}
	}

	update() {

		// console.log("SET LOCAL POS", "target pos : ", this.targetPos, "local x : ", this.local.x, "local y", this.local.y);

		if (!this.state) {
			if (this.targetPos < this.local.x) {
				if (this.local.x - this.speed < this.targetPos) {
					this.setLocalPosition(this.targetPos, this.local.y);
				}
				else
					this.setLocalPosition(this.local.x - this.speed, this.local.y);
			}
		}

		if (typeof this.state === 'function') {
			this.state();
		}
	}

	deleteAnimation() {
		if (Date.now() > this.deleteAnimationStart)
			GameObject.delete(this);
		this.setLocalPosition(this.local.x, this.local.y - Math.round(this.velocity.y));
		this.velocity.y += -6.0;
	}

	deleteLetter() {
		this.deleteAnimationStart = Date.now() + 200;
		this.state = this.deleteAnimation;
		this.velocity.y = 20;
	}

	setTargetPos(pos) {
		this.targetPos = pos;
	}

}

export default LetterStd;
