

class RenderText {

	constructor(img, text) {
		this.img = new Image();
		this.img.src = img;
		this.text = text;

		this.alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	}

	draw(ctx, x, y) {

		for (let i = 0; i < this.text.length; i++) {
			ctx.drawImage(this.img, 46 * this.alpha.indexOf(this.text[i]), 0, 46, 46, x, y, 46, 46);
			x += 15
		}
	}

	changeText(string) {
		this.text = string;
	}

	getText() {
		return this.text;
	}
}

export default RenderText;
