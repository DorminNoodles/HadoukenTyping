import GameObject from '../../core/gameObject';
import SoloGameScript from './soloGameScript';
import Controller from '../controller/controller';
import * as Core from '../../core/core';
import * as RenderManager from '../../renderManager';
import Board from '../board/board';
import TextRender from '../textRender';
import DeathTimer from '../deathTimer';


class SoloGame extends GameObject {

    constructor() {
        console.log("SOLO GAME");
        super('SoloGame');
        // this.addScript(new SoloGameScript());

        // this.controller = new Controller('Controller');
        // console.log("gameloop");
        this.openGameCanvas();
        this.gameLoop();
        let board = this.addGameObject(new Board('MainBoard', true, false));
        board.setLocalPosition(60, 500);

        // let board2 = this.addGameObject(new Board('MainBoard2', false, true));
        // board2.setPosition(60, 120);

        // let deathTimer = this.addGameObject(new TextRender('DeathTimer'));
        // deathTimer.setPosition(400, 200);
        // deathTimer.write(0, '0001');


        // le timer de mort !
        // let deathTimer = this.addGameObject(new DeathTimer('DeathTimer', 5));
        // deathTimer.setPosition(0, 0);
    }

    update() {
        // console.log("Hello !!!");
    }

    openGameCanvas() {
        let gameCanvas = document.getElementById('gameCanvas');
        gameCanvas.style.display = 'flex';
        gameCanvas.style.top = '0px';
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;
        gameCanvas.style.animationName = 'gameCanvasOpen';
    }

    gameLoop() {
		let loop = (e) => {
			// this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            Core.update();
            RenderManager.update();
			this.reqAnimGameLoop = requestAnimationFrame(loop);
		}
		this.reqAnimGameLoop = requestAnimationFrame(loop);
	}

}

export default SoloGame;