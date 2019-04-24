import Script from '../../script';

class BlackDeathUIScript extends Script {

	constructor() {
		super();

		// console.log(this.object);
		// console.log(this.gameObjectId);
		// this.object.render.changeOpacity(0.0);

		this.addListener('letterSpawned', (e) => {
			// console.log("HELLO");
			if (this.object.render) {
				let opacity = (1.0 / 15) * e.detail.qty;
				this.object.render.opacity = opacity;
			}
		})

	}


}

export default BlackDeathUIScript;
