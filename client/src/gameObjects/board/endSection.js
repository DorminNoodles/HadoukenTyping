import BoardScript from './boardScript';
import GameObject from '../../core/gameObject';
import Render from '../../render';

class EndSection extends GameObject {

	constructor(name) {
		super(name);
		this.addRender(new Render('./images/endSection.png', 20));
	}
}

export default EndSection;
