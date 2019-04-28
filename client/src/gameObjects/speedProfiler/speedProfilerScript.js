import { niceFlash } from '../../anim/animSpeedWordUI';
import GameObject from '../../gameObject';
import Script from '../../script';
import Render from '../../render';

import speedWordUIScript from './SpeedWordUIScript';


class SpeedProfilerScript extends Script {

	constructor() {
		super();
		// console.log("POPOPO", pos);

		this.addListener('deleteLetter', (e) => {
			let pos = {
				'x': e.detail.x,
				'y': e.detail.y
			};
			console.log("POPOPO", pos);
			this.createUI(pos);
		});
	}

	createUI(pos) {

		let obj = this.newObject(new GameObject('speedUI'));
		obj.render = new Render('./speedUI.png');
		obj.addScript(new speedWordUIScript());
		obj.setPosition(pos.x, pos.y);
		obj.render.addAnim(niceFlash);
		console.log("4567");

		this.arr.push(obj);
	}

}

export default SpeedProfilerScript;
