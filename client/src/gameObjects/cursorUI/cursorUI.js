import { idle, idleX2 } from '../../anim/animCursorUI';
import Render from '../../render';
import GameObject from '../../core/gameObject';
import CursorUIScript from './cursorUIScript';

const cursorUI = () => {
	let obj = new GameObject('cursorUI');
	obj.addScript(new CursorUIScript());

	obj.setPosition(-2000, -2000);

	obj.render = new Render('./cursorUI.png');

	obj.render.addAnim(idle);
	obj.render.addAnim(idleX2);
	obj.render.setZIndex(400);
	return obj;
}

export default cursorUI;
