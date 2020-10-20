import { idle, idleX2 } from '../../anim/animCursorUI';

import GameObject from '../../core/gameObject';
import Render from '../../render';
import Script from '../../core/script';

class CursorUIScript extends Script {

	constructor() {
		super();

		this.combo = 0;

		this.addListener('combo', () => {
			this.combo++;
			if (this.combo > 5) {
				this.object.render.changeAnim('idleX2');
			}
		});

		this.addListener('badLetter', () => {
			this.combo = 0;
			this.object.render.changeAnim('idle');
		});

	}

}


export default CursorUIScript;
