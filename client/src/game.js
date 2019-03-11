// import ryuAnim from './ryuAnim.js';

// import * as pender from './render';
import renderManager from './renderManager';


class Game {

	constructor(){

		this.ctx;
		this.canvas = document.getElementById('canvas');




		let hello = {"vieille": "pute"};
		renderManager.addObject(hello);

		// canvas.width = 1024;
		// canvas.height = 480;
		//
		// ctx = canvas.getContext('2d');
		// ctx.scale(4,4);
		//
		// this.againBtn = document.getElementsByClassName("againMenuBtn");
		// againBtn[1].onclick = quitMatch;
		// againBtn[0].onclick = restartMatch;
		//
		//
		// this.ryu1 = new Character(0,0, false);
		// ryu1.addAnimation(ryuAnim);

		// let objet =  {"hello": 42};
		// renderManager.addObject(objet);
	}



}


export default Game;
