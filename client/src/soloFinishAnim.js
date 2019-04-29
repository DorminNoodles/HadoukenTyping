
class SoloFinishAnim {

	constructor() {
		this.delayBeforeDisplay = Date.now() + 400;
		this.speed = 60;
	}

	update() {
		if (this.delayBeforeDisplay < Date.now() && this.object.y > -300)
			this.speed -= 5;
		if (this.speed < 0)
				this.speed = 0;
		if (this.delayBeforeDisplay < Date.now())
			this.object.move(0, this.speed);
	}

}

export default SoloFinishAnim;
