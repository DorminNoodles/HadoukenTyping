import BarScript from './barScript';
import GameObject from '../../gameObject';
import RenderText from '../../renderText';
import Render from '../../render';

const bar = () => {
	let obj = new GameObject('bar');
	obj.addScript(new BarScript());

	obj.render = new Render('./barSection.png');

	return obj;
}

export default bar;
