import ScoreUIScript from './scoreUIScript';
import GameObject from '../../core/gameObject';
import RenderText from '../../renderText';
import Render from '../../render';

const scoreUI = () => {
	let obj = new GameObject('scoreUI');
	obj.addScript(new ScoreUIScript());
	obj.setPosition(620, 10);
	obj.render = new Render('./images/backgroundScore.png');

	// text.addScript()
	return obj;
}

export default scoreUI;
