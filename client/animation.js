//
//
// let cols = 8;
//
//
// module.exports = cols;


class Animation {

	//the position where the frame will be drawn




	constructor() {
		console.log("create Animation");

		this.x = 0;
		this.y = 0;

		this.srcX = 0;
		this.srcY = 0;

		this.width = 64;
		this.height = 128;

		this.sheetWidth = 800;
		this.sheetHeight = 250;

		this.cols = 4;
		this.currentFrame = 0;

		this.image = new Image();
		this.image.src = "spritesRyu.png";
		this.canvas = document.getElementById('canvas');

		this.canvas.width = 64*4;
		this.canvas.height = 128*4;

		this.ctx = this.canvas.getContext('2d');
		this.ctx.scale(4, 4);
	}

	sayHello(){
		console.log("Hello");
	}

	updateFrame(){
		this.currentFrame = ++this.currentFrame % this.cols;
		this.srcX = this.currentFrame * this.width;
		this.srcY = 0;
	}

	drawImage(){
		this.updateFrame();
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.drawImage(this.image, this.srcX, this.srcY, 64*2, 128*2, this.x, this.y, 64*2, 128*2);
	}
}



export default Animation;
