import Script from '../../script';


class LetterStandardScript extends Script {

	constructor(position) {
		super();
		this.nextMove = Date.now() + 200;
		this.position = position
		this.originX = 200;
		this.originY = 320;

		this.target = {
			'x': 800,
			'y' : 200
		};

		this.speed = 4;
	}

	update() {

		this.target = this.setTarget(this.position);

		//movement
		if (this.gameObject.getPosition().x < this.target.x) {
			//if pos is before or after the target
			//if the next movement is less than delta movement go to target
			if (this.target.x - this.gameObject.getPosition().x < this.speed)
				this.gameObject.setPosition(this.target.x, this.gameObject.getPosition().y);
			else
				this.gameObject.move(this.speed, 0);
		}
 		else if (this.gameObject.getPosition().x > this.target.x) {
			if (this.gameObject.getPosition().x - this.target.x < this.speed)
				// console.log('f');
				this.gameObject.setPosition(this.target.x, this.gameObject.getPosition().y);
			else
				this.gameObject.move(-this.speed, 0);
		}

		if (this.gameObject.getPosition().y < this.target.y) {
			if (this.target.y - this.gameObject.getPosition().y < this.speed)
				this.gameObject.setPosition(this.gameObject.getPosition().x, this.target.y);
			else
				this.gameObject.move(0, this.speed);
		}
		else if (this.gameObject.getPosition().y > this.target.y) {
			if (this.gameObject.getPosition().y - this.target.y < this.speed)
				this.gameObject.setPosition(this.gameObject.getPosition().x, this.target.y);
			else
				this.gameObject.move(0, -this.speed);
		}

	}

	setTarget(pos) {

		let target = {};

		target.x = ((pos % 12) * 96) + this.originX;
		target.y = ((pos / 12) * 140) + this.originY;
		// target.y = 300;

		return target;
	}

	setPosition(pos) {
		this.position = pos;
	}


}

export default LetterStandardScript;
