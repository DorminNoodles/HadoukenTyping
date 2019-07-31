import GameObject from '../../core/gameObject';
// import { a1ShowA, a1ShowKanji }from '../../anim/animLetter';
import * as anim from '../../anim/animAsianLetters';
import LetterAsianScript from './letterAsianScript';
import Render from '../../render';


const letterAsian = (position, letter) => {
	let obj = new GameObject('letterAsian');

	obj.addScript(new LetterAsianScript(position, letter, obj));
	// obj.render = new Render('./asianLetters.png');
	obj.render = new Render('./asianLetters.png');
	obj.render.setOffset(-2,-32);
	obj.render.addAnim(anim['a1ShowA']);
	obj.render.addAnim(anim['a1ShowKanji']);
	obj.render.addAnim(anim['animStone01']);
	obj.render.addAnim(anim['animStone02']);
	obj.render.addAnim(anim['animStone03']);
	obj.render.addAnim(anim['animStone04']);
	obj.render.addAnim(anim['animStone05']);
	obj.render.addAnim(anim['animStone06']);
	obj.render.addAnim(anim['animStone07']);
	obj.render.addAnim(anim['animStone08']);
	obj.render.addAnim(anim['animStone09']);

	return obj;
}

export default letterAsian;
