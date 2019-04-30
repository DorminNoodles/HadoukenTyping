import { idle } from '../../anim/animCursorUI';
import Render from '../../render';
import GameObject from '../../gameObject';
import CursorUIScript from './cursorUIScript';

const cursorUI = () => {
	let obj = new GameObject('cursorUI');

	obj.setPosition(-2000, -2000);

	obj.render = new Render('./cursorUI.png');

	obj.addScript(new CursorUIScript);
	obj.render.addAnim(idle);
	obj.render.setZIndex(400);
	return obj;
}

export default cursorUI;
