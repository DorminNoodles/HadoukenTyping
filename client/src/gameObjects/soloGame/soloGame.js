import GameObject from '../../core/gameObject';
import SoloGameScript from './soloGameScript';
import Controller from '../controller/controller';
import * as Core from '../../core/core';
import * as RenderManager from '../../renderManager';
import Board from '../board/board';
import TextRender from '../textRender';
import DeathTimer from '../deathTimer';
import ProgressionBar from '../progressionBar';


class SoloGame extends GameObject {

    constructor() {
        console.log("SOLO GAME");
        super('SoloGame');
        // this.addScript(new SoloGameScript());

        // this.controller = new Controller('Controller');
        // console.log("gameloop");
        this.openGameCanvas();
        this.gameLoop();

        this.board = this.addGameObject(new Board('MainBoard', true, false));
        this.board.setLocalPosition(60, 250);

        // this.board2 = this.addGameObject(new Board('MainBoard2', false, true));
        // this.board2.setLocalPosition(60, 600);

        this.progressionBar = this.addGameObject(new ProgressionBar('ProgressionBar'));
        this.progressionBar.setLocalPosition(80, 35);

        // let deathTimer = this.addGameObject(new TextRender('DeathTimer'));
        // deathTimer.setPosition(400, 200);
        // deathTimer.write(0, '0001');

        // le timer de mort !
        // let deathTimer = this.addGameObject(new DeathTimer('DeathTimer', 5));
        // deathTimer.setPosition(0, 0);

    }

    update() {
        // console.log("Hello !!!");
        if (this.board && this.board.isLose()) {
            console.log("322nm42n: Lose Game !");
            GameObject.delete(this.board);
            this.board = null;
        }

        if (this.board2 && this.board2.isLose()) {
            console.log("322nm42n: Lose Game !");
            // GameObject.delete(this.board2);
            // this.board2 = null;
        }
        // console.log("32kjenc: childs >> ", this.board.childs);
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