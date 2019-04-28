// import BlackDeathUIScript from './BlackDeathUIScript';
import GameObject from '../../gameObject';
import RenderText from '../../renderText';
import Render from '../../render';
import NumberKeysUIScript from './numberKeysUIScript';

const numberKeysUI = () => {
	let obj = new GameObject('numberKeysUI');
	// console.log(obj);
	obj.addScript(new NumberKeysUIScript());

	obj.renderText = new RenderText('./gameFont5.png', '0' + 'keys', 60, 110);
	// obj.render.changeOpacity(0.0);
	obj.setPosition(150, 120);




	return obj;
}

export default numberKeysUI;
