import GameObject from '../../gameObject';

import { idle } from '../../anim/animTimeLetter';

import Render from '../../render';
import LetterTimeScript from './letterTimeScript';


const letterTime = (position) => {

	let obj = new GameObject('letterTime');

	obj.addScript(new LetterTimeScript(position, 'a', obj));

	obj.render = new Render('./timeLetter.png');
	obj.render.addAnim(idle);
	obj.render.setOffset(-17,-48);


	return obj;
}

export default letterTime;
