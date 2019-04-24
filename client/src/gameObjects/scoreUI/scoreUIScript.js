import Script from '../../script';
import GameObject from '../../gameObject';
import RenderText from '../../renderText';



class ScoreUIScript extends Script {

	constructor() {
		super();

		let text = this.newObject(new GameObject('scoreUIText'));
		text.setPosition(630, 30);
		text.renderText = new RenderText('./gameFont1.png', '0', 15, 46);

		this.addListener('displayScoreUI', (e) => {
			text.renderText.changeText(e.detail.score.toString());
		});
	}
}

export default ScoreUIScript;
