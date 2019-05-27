import Script from '../../script';


class LetterStandardScript extends Script {

	constructor() {
		super();
		this.nextMove = Date.now() + 200;

		this.target = {
			'x': 50,
			'y' : 50
		};

		this.speed = 10;
	}

	update() {
		// if (this.nextMove < Date.now()) {
			// this.gameObject.move(4,0);
		// 	this.nextMove = Date.now() + 120;
		// }

		// console.log("HEYYYYYYYYY");
		// if (this.gameObject.getPosition().x < this.target.x) {
		// 	if (this.target.x - this.gameObject.getPosition().x < this.speed)
		// 		this.gameObject.setPosition(this.target.x, this.gameObject.getPosition().y);
		// 	else
		// 		this.gameObject.move(this.speed, 0);
		// }
		//
		// if (this.gameObject.getPosition().x > this.target.x) {
		// 	if (this.gameObject.getPosition().x - this.target.x < this.speed)
		// 		this.gameObject.setPosition(this.gameObject.getPosition().x, this.target.y);
		// 	else
		// 		this.gameObject.move(-this.speed, 0);
		// }




		// if (this.gameObject.getPosition.x != this.target.x) {
		// 	if (this.gameObject.)
		// 	this.gameObject.move(this.speed, 0);
		// }
		//
		// if (this.gameObject.getPosition.y != this.target.y)
		// 	this.gameObject.move(0, this.speed);
	}


}

export default LetterStandardScript;
