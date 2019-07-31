import Script from '../../core/script';

class SpeedWordUIScript extends Script {

	constructor() {
		super();
	}

	update() {
		this.object.move(0, 0)
	}
}

export default SpeedWordUIScript;
