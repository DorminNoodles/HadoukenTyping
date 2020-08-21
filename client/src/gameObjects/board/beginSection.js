import BoardScript from './boardScript';
import GameObject from '../../core/gameObject';
import Render from '../../render';

class BeginSection extends GameObject {

	constructor(name) {
		super(name);
		this.addRender(new Render('./images/beginSection.png'));
	}
}

export default BeginSection;
