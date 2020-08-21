import Script from '../../core/script';

class BlackDeathUIScript extends Script {

	constructor() {
		super();

		this.opacityAsked = 0.0;

		this.addListener('letterSpawned', (e) => {
			// console.log("HELLO");
			if (this.object.render && e.detail.qty > 8) {
				this.opacityAsked = (1.0 / (15 - 8)) * (e.detail.qty - 8);

			}
			// else
				// this.opacityAsked = 0.0;

		})
	}

	update() {
		// let n = 0.0;
		//
		// if (this.object.render.opacity < this.opacityAsked)
		// 	n = 0.005;
		// else if (this.object.render.opacity > this.opacityAsked)
		//  	n = -0.005
		// this.object.render.changeOpacity(this.object.render.opacity + n);
	}
}

export default BlackDeathUIScript;
