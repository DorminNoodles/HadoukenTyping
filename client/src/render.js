
class Render {

	constructor(src, width, height, frameNb, row, speed) {
		this.img = new Image();
		this.img.src = src;
		console.log("hello in render it's a component");
		this.frameNb = frameNb;
		this.currentFrame = 0;
		this.width = width;
		this.height = height;
		this.row = row;
		this.speed = speed;
		this.nextFrameTime = 0;
	}

	draw(ctx, x, y) {
		ctx.drawImage(this.img,
			this.width * this.currentFrame,
			this.height * this.row,
			this.width,
			this.height,
			x,
			y,
			this.width,
			this.height
		);

		if (this.nextFrameTime < Date.now()) {
			this.currentFrame = (this.currentFrame + 1) % this.frameNb;
			this.nextFrameTime = Date.now() + this.speed;
		}
	}

}

export default Render;
