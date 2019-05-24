import Script from '../../script';
import beginSection from './sections/beginSection'
import section from './sections/section'
import endSection from './sections/endSection'


class BarScript extends Script {

	constructor() {
		super();

		this.nbSections = 1;

		this.timer = Date.now() + 1000;

		this.sectionPosOriginX = 164;
		this.sectionPosOriginY = 300;

		this.beginSection = this.newObject(beginSection());
		this.beginSection.setPosition(30, 300);

		this.section = [];
		this.section[0] = this.newObject(section());
		this.section[0].setPosition(this.sectionPosOriginX, 300);

		this.endSection = this.newObject(endSection());
		this.endSection.setPosition(255, 300);

		this.addListener('addBarSection', () => {
			// console.log('+ 1 section ', 'nb : ', this.nbSections);
			this.nbSections++;

			let x = (this.nbSections - 1) % 10;

			let y = Math.floor((this.nbSections - 1) / 10);

			this.section[this.nbSections - 1] = this.newObject(section());





			if (y % 2)
				console.log("impair");

			x = (y % 2) ? 9 - x : x;



			let deltaX = x * 92;
			let deltaY = y * 148;


			console.log("YYYY : ", y);
			console.log("XXXX : ", x);


			if (x === 9 && y % 2 === 0)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerUpRight.png'});
			if (x === 0 && y % 2) {
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerUpLeft.png'});
				this.section[this.nbSections - 1].move(-25, 0);
			}
			if (x === 9 && y % 2)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerBottomRight.png'});
			if (x === 0 && y % 2 === 0)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerBottomLeft.png'});



			this.section[this.nbSections - 1].setPosition(this.sectionPosOriginX + deltaX, this.sectionPosOriginY + deltaY);


			this.moveEndSection(this.endSection, this.nbSections);


			// if (this.nbSections % 6 === 0) {
			// 	this.endSection.render.changeImage({'src': '../../beginSection.png'});
			// }

		});

	}

	moveEndSection(endSection, nbSections) {

		let x = nbSections % 10;
		let y = Math.floor(nbSections / 10);

		x = (y % 2) ? 9 - x : x;


		endSection.setPosition(this.sectionPosOriginX + (92 * x), this.sectionPosOriginY + (148 * y));

		if (this.nbSections % 10 === 0) {
			endSection.render.changeImage({'src': '../../endSectionCornerRight.png'});
			// endSection.setPosition(this.sectionPosOriginX + (92 * x) - 25, this.sectionPosOriginY + (148 * y));
			endSection.move(-36, 0);
		}
		else if (y % 2) {
			this.endSection.render.changeImage({'src': '../../endSectionInvert.png'});
			endSection.move(-12, 0);
		}
		else
			endSection.render.changeImage({'src': '../../endSection.png'});


	}

	update() {


		if (this.timer < Date.now()) {
			this.timer = Date.now() + 1000;

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
