import Render from '../../render';
import GameObject from '../../core/gameObject';
import EndGameMenuScript from './endGameMenuScript';

const endGameMenu = () => {

	let obj = new GameObject('endGameMenu');
	obj.addScript(new EndGameMenuScript());

	// obj.render = new Render('./cursorUI.png');
	// obj.render.addAnim(idle);

	return obj;
}

export default endGameMenu;
