
class SoloFinishAnim {

	constructor() {
		this.delayBeforeDisplay = Date.now() + 1200;
		this.speed = 50;
	}

	update() {
		if (this.delayBeforeDisplay < Date.now() && this.object.y > -150)
			this.speed -= 5;
		if (this.speed < 0)
				this.speed = 0;
		if (this.delayBeforeDisplay < Date.now())
			this.object.move(0, this.speed);
	}

}

export default SoloFinishAnim;
