// import { idle } from './anim/animCursorUI';
import Render from '../../render';
import GameObject from '../../gameObject';
import CursorUIScript from './cursorUIScript';

const cursorUI = () => {
	let obj = new GameObject('cursorUI');

	// obj.addScript(new CursorUIScript);

	obj.render = new Render('./cursorUI.png');
	// obj.render.addAnim(idle);


	return obj;
}

export default cursorUI;
