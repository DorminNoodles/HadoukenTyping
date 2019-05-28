import Script from '../../script';

import letterStandard from '../letterStandard/letterStandard';

class SpawnerScript extends Script {

	constructor() {
		super();

		this.spawnSpeed = 20;
		this.deltaSpawnSpeed = 60000 / this.spawnSpeed;
		this.nextSpawn = Date.now() + 1200;


	}

	update() {

		if (this.nextSpawn < Date.now()) {
			this.nextSpawn = Date.now() + this.deltaSpawnSpeed;
			console.log("gnagna");
			let letter = this.newObject(letterStandard(5));
			letter.setPosition(1000, 800);
			letter.render.setZIndex(50);

			let spawnLetter = new CustomEvent('spawnLetter',
				{'detail': {
					'letter': letter
				}
			});
			console.log("HERE");
			document.dispatchEvent(spawnLetter);
		}
	}



}

export default SpawnerScript;
