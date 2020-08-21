import BoardScript from './boardScript';
import GameObject from '../../core/gameObject';
import Render from '../../render';

class Section extends GameObject {

	constructor(name) {
		super(name);
		this.addRender(new Render('./images/section.png'));
		// this.render.setOffset(2, 2);
	}
}

export default Section;
