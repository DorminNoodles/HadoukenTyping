// import Render from './render.js';

// arrayOfObject.push('5');

//take json anim


class Character {

	constructor(x, y, reverse){
		this.inter;
		this.x = x;
		this.y = y;
		this.reverse = reverse;

		this.anim = [];

		this.currentAnim;
		this.currentFrame = 0;

		this.inter = setInterval(()=> {
			this.update();
		}, 100);
	}

	call() {

	}

	update() {
		// console.log("Update Object");

		this.playAnim();
	}

	updateFrame(){
		this.currentFrame = ++this.currentFrame % this.currentAnim.frame;
		this.srcX = this.currentFrame * this.currentAnim.width;
		this.srcY = this.currentAnim.height * this.currentAnim.rows;
		if (!this.currentAnim.loop && this.currentAnim.frame - 1 == this.currentFrame)
			return true;
		return false;
	}

	render() {
		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');

		ctx.imageSmoothingEnabled = false;

		if (this.reverse) {
			ctx.save()
			ctx.scale(-1,1);
		}
		ctx.drawImage(this.currentAnim.image, this.srcX, this.srcY, 64, 128, this.x, this.y, 64, 128);
		ctx.restore();
	}

	addAnimation(anim) {
		anim.forEach((elem) => {
			this.anim[elem.name] = elem;
			this.anim[elem.name].image = new Image();
			this.anim[elem.name].image.src = this.anim[elem.name].file;
		});
		this.currentAnim = this.anim['idle'];
	}

	playAnim() {


		if (this.currentAnim) {
			let finish = this.updateFrame();
			if (finish) {
				this.currentAnim = this.anim['idle'];
			}
			this.render();
		}
	}

	changeAnim(animName) {
		this.currentAnim = this.anim[animName];
		this.currentFrame = 0;
	}
}


export default Character;
// module.exports = Character;
