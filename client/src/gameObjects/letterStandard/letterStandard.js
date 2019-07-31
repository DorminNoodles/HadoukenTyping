import GameObject from '../../core/gameObject';
import * as anim from '../../anim/animLetter';
import LetterStandardScript from './letterStandardScript';
import Render from '../../render';


const letterStandard = (position, letter) => {
	let obj = new GameObject('letterStandard');

	obj.addScript(new LetterStandardScript(position, letter));
	// obj.render = new Render('./asianLetters.png');
	obj.render = new Render('./boutonLetters.png');
	obj.render.addAnim(anim['animA']);
	return obj;
}

export default letterStandard;
