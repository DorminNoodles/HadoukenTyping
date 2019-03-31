
class Render {

	constructor(src) {
		this.anim = [];
		this.img = new Image();
		this.img.src = src;

		this.isAnimated = false;
		this.currentFrame = 0;
		this.nextFrameTime = 0;
	}

	addAnim(anim) {
		// console.log(anim);
		if (!anim) {
			console.log("No anim !");
		}
		this.isAnimated = true;
		this.anim[anim.name] = anim;
		if (!this.currentAnim) {
			this.nextFrameTime = Date.now() + anim.speed;
			this.currentAnim = anim.name;
		}
	}

	draw(ctx, x, y) {
		// console.log(this.img.src);
		if (this.img) {
			if (this.isAnimated)
				this.drawAnim(ctx, x, y);
			else
				ctx.drawImage(this.img, x, y);
		}

	}

	drawAnim(ctx, x, y) {
		if (this.currentAnim && this.anim[this.currentAnim]) {
			let anim = this.anim[this.currentAnim];
			let sX = anim.width * (this.currentFrame + this.anim[this.currentAnim].col) ;
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
				if (!this.anim[this.currentAnim].loop && this.currentFrame == frameNb - 1)
					this.currentAnim = this.anim[this.currentAnim].nextAnim;
				this.currentFrame = (this.currentFrame + 1) % frameNb;
				this.nextFrameTime = Date.now() + speed;
			}
		}
	}

	changeAnim(currentAnim, nextAnim) {
		this.currentFrame = 0;
		if (this.anim[currentAnim])
			this.currentAnim = currentAnim;

		if (nextAnim)
			this.nextAnim = nextAnim;
		else
			this.nextAnim = undefined;
	}

}

export default Render;
