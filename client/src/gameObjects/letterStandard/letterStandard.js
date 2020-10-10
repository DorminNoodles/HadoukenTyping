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
		this.addRender(new Render('./images/boutonLetters.png'));
		this.render.addAnim(anim['anim'+sign]);
		this.targetPos = 0;
		this.speed = 5;
		this.sign = sign;
	}

	update() {
		if (this.targetPos < this.local.x) {
			if (this.local.x - this.speed < this.targetPos)
				this.setLocalPosition(this.targetPos, this.local.y);
			else
				this.setLocalPosition(this.local.x - this.speed, this.local.y);

			// this.setLocalPosition(this.x - this.speed, this.y);
			// if ()
		}
	}

	setTargetPos(pos) {
		console.log(this.name, 'setTargetPos .... ');
		console.log(pos);
		this.targetPos = pos;
	}

}

export default LetterStd;
