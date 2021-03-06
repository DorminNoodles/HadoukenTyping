class Render {

	constructor(src, zIndex = 0) {
		this.anim = [];
		this.img = new Image();
		this.img.src = src;

		this.isAnimated = false;
		this.currentFrame = 0;
		this.nextFrameTime = 0;
		this.currentAnim = null;

		this.opacity = 1.0;

		this.zIndex = zIndex;

		this.offsetX = 0;
		this.offsetY = 0;

		this.height = null;
		this.width = null;

		this.sourceX = 0;
		this.sourceY = 0;

		this.pause = false;

	}

	//Permet d'ajouter une animation a utiliser quand on veut (si le render n'a pas d'animation on lui ajoute la premiere)
	addAnim(anim) {
		this.isAnimated = true;
		this.anim[anim.name] = anim;
		if (!this.currentAnim) {
			this.nextFrameTime = Date.now() + anim.speed;
			this.currentAnim = anim.name;
		}
	}

	draw(ctx, x, y) {
		ctx.globalAlpha = this.opacity;
		if (this.img) {
			if (this.isAnimated)
				this.drawAnim(ctx, x, y);
			else {
				if (!this.width && !this.height) {
					ctx.drawImage(this.img,
						x + this.offsetX,
						y + this.offsetY,
					);
				}
				else { // ok c'est degueulasse
					// console.log('5673lk: draw ctx');
					ctx.drawImage(this.img,
						this.sourceX,
						this.sourceY,
						this.width,
						this.height,
						x + this.offsetX,
						y + this.offsetY,
						this.width,
						this.height
					);
				}
			}
		}
	}

	setZIndex(zIndex) {
		this.zIndex = zIndex;
	}

	drawAnim(ctx, x, y) {
		if (this.currentAnim && this.anim[this.currentAnim]) {
			let anim = this.anim[this.currentAnim];
			let sX = anim.width * (this.currentFrame + this.anim[this.currentAnim].col);
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
				x + this.offsetX,
				y + this.offsetY,
				width,
				height
			);

			if (this.nextFrameTime < Date.now() && !this.pause) {
				if (!this.anim[this.currentAnim].loop && this.currentFrame == frameNb - 1)
					this.currentAnim = this.anim[this.currentAnim].nextAnim;
				this.currentFrame = (this.currentFrame + 1) % frameNb; //le modulo permet de boucler
				this.nextFrameTime = Date.now() + speed;
			}
		}
	}

	changeOpacity(opacity) {
		this.opacity = opacity;
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

	setOffset(x, y) {
		this.offsetX = x;
		this.offsetY = y;
	}

	setSource(x, y) {
		this.sourceX = x;
		this.sourceY = y;
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	changeImage(img) {
		this.img = new Image();
		this.img.src = img.src;
	}

	stop() {
		this.pause = true;
	}

}

export default Render;
