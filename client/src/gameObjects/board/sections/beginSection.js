// import BarScript from './barScript';
import GameObject from '../../../gameObject';
import RenderText from '../../../renderText';
import Render from '../../../render';

const beginSection = () => {
	let obj = new GameObject('beginSection');
	// obj.addScript(new ());

	obj.render = new Render('./beginSection.png');

	return obj;
}

export default beginSection;
