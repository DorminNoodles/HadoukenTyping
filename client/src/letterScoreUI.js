import Script from './core/script';

class letterScoreUI extends Script {

	constructor() {
		super();
	}

	update() {
		this.object.move(0, -4)
	}
}

export default letterScoreUI;
