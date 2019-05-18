import Bar from './BlackDeathUIScript';
import GameObject from '../../gameObject';
import RenderText from '../../renderText';
import Render from '../../render';

const bar = () => {
	let obj = new GameObject('bar');
	obj.addScript(new BarScript());

	obj.render = new Render('./.png');

	return obj;
}

export default bar;
