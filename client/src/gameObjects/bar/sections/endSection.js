// import BarScript from './barScript';
import GameObject from '../../../gameObject';
import RenderText from '../../../renderText';
import Render from '../../../render';

const endSection = () => {
	let obj = new GameObject('endSection');
	// obj.addScript(new ());

	obj.render = new Render('./endSection.png');

	return obj;
}

export default endSection;
