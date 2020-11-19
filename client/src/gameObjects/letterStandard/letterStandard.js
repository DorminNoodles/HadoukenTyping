import GameObject from '../../core/gameObject';
import * as anim from '../../anim/AnimLetter';
import LetterStandardScript from './letterStandardScript';
import Render from '../../render';
import LetterFlashDelete from '../letterFlashDelete';
import LetterLockFlash from '../LetterLockFlash';

// const letterStandard = (position, letter) => {
// 	let obj = new GameObject('letterStandard');

// 	obj.addScript(new LetterStandardScript(position, letter));
// 	// obj.render = new Render('./asianLetters.png');
// 	obj.render = new Render('./boutonLetters.png');
// 	obj.render.addAnim(anim['animA']);
// 	return obj;
// }

const IDLE = 0;
const LOCK = 1;

class LetterStd extends GameObject {

	constructor(name, sign = 'A') {
		super(name);
		this.addRender(new Render('./images/boutonLetters.png', 40));
		this.render.addAnim(anim['anim'+sign]);
		this.targetPos = 0;
		this.speed = 10;
		this.sign = sign;

		this.state = IDLE;

		this.deleteAnimationStart = 0;
		this.velocity = {
			x: 0.0,
			y: 0.0,
		}
		this.lock = false;
		this.lockFrame = 1;
		this.lockDamage = 0;

		// setTimeout(() => {
		// 	this.isEnabled = false;
		// 	this.render.pause = true;
		// },700);
	}

	update() {
		if (this.targetPos < this.local.x) {
			if (this.local.x - this.speed < this.targetPos) {
				this.setLocalPosition(this.targetPos, this.local.y);
			}
			else
				this.setLocalPosition(this.local.x - this.speed, this.local.y);
		}
	}

	deleteAnimation() {
		if (Date.now() > this.deleteAnimationStart)
			GameObject.delete(this);
		this.setLocalPosition(this.local.x, this.local.y - Math.round(this.velocity.y));
		this.velocity.y += -6.0;
	}

	deleteLetter() {
		if (!this.lock) {
			let flash = this.addGameObject(new LetterFlashDelete('flash', this.sign));
			flash.setLocalPosition(0, -180);
			this.deleteRender();
		}

		if (this.lock) {
			let flash = this.addGameObject(new LetterLockFlash('lockFlash'));
			this.deleteRender();

			flash.setLocalPosition(0, -178);
		}

		setTimeout(() => {
			GameObject.delete(this);
		}, 400);
	}

	takeDamage() {
		this.lockFrame++;
		this.lockDamage++;
		if (this.render) {
			console.log('animStone0' + this.lockFrame);
			this.render.addAnim(anim['animStone0' + this.lockFrame]);
			this.render.changeAnim(anim['animStone0' + this.lockFrame].name);
		}
	}

	setLock() {
		this.lock = true;
		this.state = LOCK;
		// console.log(anim['animStone01']);
		if (this.render) {
			this.render.addAnim(anim['animStone01']);
			this.render.changeAnim(anim['animStone01'].name);
		}
	}

	isBroken() {
		if (this.lockDamage > 7)
			return true;
		return false;
	}

	setTargetPos(pos) {
		this.targetPos = pos;
	}

	freeze() {
		this.isFreeze = true;
	}

}

export default LetterStd;
