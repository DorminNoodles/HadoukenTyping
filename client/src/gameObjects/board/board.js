import BoardScript from './boardScript';
import GameObject from '../../core/gameObject';
import RenderText from '../../renderText';
import Render from '../../render';

const board = () => {
	let obj = new GameObject('board');
	obj.addScript(new BoardScript());

	obj.render = new Render('./barSection.png');

	return obj;
}

export default board;
