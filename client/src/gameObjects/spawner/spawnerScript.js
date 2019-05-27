import Script from '../../script';

import letterStandard from '../letterStandard/letterStandard';

class SpawnerScript extends Script {

	constructor() {
		super();

		this.spawnSpeed = 2;
		this.deltaSpawnSpeed = 60000 / this.spawnSpeed;
		this.nextSpawn = Date.now() + 1200;


	}

	update() {

		if (this.nextSpawn < Date.now()) {
			this.nextSpawn = Date.now() + this.deltaSpawnSpeed;
			console.log("gnagna");
			let letter = this.newObject(letterStandard());
			letter.setPosition(500,0);




		}

	}



}

export default SpawnerScript;
