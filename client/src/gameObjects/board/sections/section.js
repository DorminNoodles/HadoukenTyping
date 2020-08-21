// import BarScript from './barScript';
import GameObject from '../../../core/gameObject';
import RenderText from '../../../renderText';
import Render from '../../../render';

const section = () => {
	let obj = new GameObject('section');
	// obj.addScript(new ());

	obj.render = new Render('./images/section.png');

	return obj;
}

export default section;
