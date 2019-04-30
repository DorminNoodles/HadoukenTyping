import { idle, idleX2 } from '../../anim/animCursorUI';

import GameObject from '../../gameObject';
import Render from '../../render';
import Script from '../../script';

class CursorUIScript extends Script {

	constructor() {
		super();

		this.combo = 0;

		this.addListener('combo', () => {
			// console.log(this.gameObject);
			this.combo++;
			console.log(this.object);
			if (this.combo > 5) {
				console.log("CHAT-----------------------");
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
