
class Render {

	constructor(src) {
		this.anim = [];
		this.currentAnim = "idle";
		this.img = new Image();
		this.img.src = src;

		// if (anim) {
		// 	console.log("hello in render it's a component");
		// 	this.frameNb = frameNb;
		// 	this.currentFrame = 0;
		// 	this.width = width;
		// 	this.height = height;
		// 	this.row = row;
		// 	this.speed = speed;
		// 	this.nextFrameTime = 0;
		// 	this.anim[anim.name] = anim
		// }
		this.isAnimated = false;
		this.currentFrame = 0;
		this.speed = 80;
		this.nextFrameTime = 0;
	}

	addAnim(anim) {
		this.isAnimated = true;
		this.anim[anim.name] = anim;
		if (!this.currentAnim)
			this.currentAnim = anim.name;
	}

	draw(ctx, x, y) {
		if (this.img) {
			if (this.isAnimated)
				this.drawAnim(ctx, x, y);
			else
				ctx.drawImage(this.img, x, y);
		}

	}

	drawAnim(ctx, x, y) {

		if (!this.anim['idle']) {
			console.log('error idle animation missing');
			return;
		}
		if (this.currentAnim) {

			let anim = this.anim[this.currentAnim]
			let sX = anim.width * this.currentFrame;
			let sY = anim.height * anim.row;
			let width = anim.width;
			let height = anim.height;
			let speed = anim.speed;
			let frameNb = this.anim[this.currentAnim].frameNb;

			ctx.drawImage(this.img,
				sX,
				sY,
				width,
				height,
				x,
				y,
				width,
				height
			);

			if (this.nextFrameTime < Date.now()) {
				console.log("current frame ++");
				this.currentFrame = (this.currentFrame + 1) % frameNb;
				// this.currentFrame += 1;
				this.nextFrameTime = Date.now() + this.speed;
			}
		}
	}

	changeAnim(currentAnim, nextAnim) {
		this.currentAnim = this.anim[currentAnim];
		if (nextAnim)
			this.nextAnim = nextAnim;
		else
			this.nextAnim = undefined;
	}

}

export default Render;
