import BlackDeathUIScript from './blackDeathUIScript';
import GameObject from '../../core/gameObject';
import RenderText from '../../renderText';
import Render from '../../render';

const blackDeathUI = () => {
	let obj = new GameObject('blackDeathUI');
	obj.addScript(new BlackDeathUIScript());

	obj.render = new Render('./blackDeathUI.png');
	obj.render.changeOpacity(0.0);


	// text.addScript()
	return obj;
}

export default blackDeathUI;
