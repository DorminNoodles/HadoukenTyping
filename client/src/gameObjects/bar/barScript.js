import Script from '../../script';
import beginSection from './sections/beginSection'
import section from './sections/section'
import endSection from './sections/endSection'


class BarScript extends Script {

	constructor() {
		super();

		this.nbSections = 1;

		this.timer = Date.now() + 600;

		this.sectionPosOriginX = 164;

		this.beginSection = this.newObject(beginSection());
		this.beginSection.setPosition(30, 300);

		this.section = [];
		this.section[0] = this.newObject(section());
		this.section[0].setPosition(this.sectionPosOriginX, 300);

		this.endSection = this.newObject(endSection());
		this.endSection.setPosition(255, 300);

		this.addListener('addBarSection', () => {
			console.log('+ 1 section ', 'nb : ', this.nbSections);
			this.nbSections++;

			this.section[this.nbSections - 1] = this.newObject(section());
			this.section[this.nbSections - 1].setPosition(this.sectionPosOriginX + (92 * (this.nbSections - 1)), 300);

			this.endSection.setPosition(this.sectionPosOriginX + (92 * this.nbSections), 300);
			if (this.nbSections % 6 === 0) {

				// console.log($HOME);
				this.endSection.render.changeImage({'src': '../../beginSection.png'});
			}
		});

	}

	update() {


		if (this.timer < Date.now()) {
			this.timer = Date.now() + 600;

			// console.log('EMIT ******************');
			let eventAddBarSection = new CustomEvent("addBarSection", {
				detail : {

				}
			});
			document.dispatchEvent(eventAddBarSection);
		}

		// console.log(this.opacityAsked);
		// let n = 0.0;
		//
		// if (this.object.render.opacity < this.opacityAsked)
		// 	n = 0.005;
		// else if (this.object.render.opacity > this.opacityAsked)
		//  	n = -0.005
		// this.object.render.changeOpacity(this.object.render.opacity + n);
	}
}

export default BarScript;
