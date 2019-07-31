import { niceFlash, goodFlash, greatFlash } from '../../anim/animSpeedWordUI';
import GameObject from '../../core/gameObject';
import Script from '../../core/script';
import Render from '../../render';

import speedWordUIScript from './speedWordUIScript';


class SpeedProfilerScript extends Script {

	constructor() {
		super();
		this.old = Date.now();

		this.addListener('deleteLetter', (e) => {
			let pos = {
				'x': e.detail.x,
				'y': e.detail.y
			};

			if (e.detail.active) {
				this.createUI(pos, Date.now() - this.old);
				this.old = Date.now();
			}
		});
	}

	createUI(pos, rank) {
		let obj = this.newObject(new GameObject('speedUI'));
		obj.render = new Render('./speedUI.png');
		obj.addScript(new speedWordUIScript());
		obj.setPosition(pos.x, pos.y + 100);
		if (rank < 150)
			obj.render.addAnim(greatFlash);
		else if (rank < 300)
			obj.render.addAnim(goodFlash);
		else
			obj.render.addAnim(niceFlash);

		setTimeout(() => {
			GameObject.delete(obj);
		}, 300);
	}
}

export default SpeedProfilerScript;
