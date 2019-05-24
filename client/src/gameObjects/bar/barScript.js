import Script from '../../script';
import beginSection from './sections/beginSection'
import section from './sections/section'
import endSection from './sections/endSection'


class BarScript extends Script {

	constructor() {
		super();

		this.nbSections = 1;
		this.sectionsMax = 12;

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

			let x = (this.nbSections - 1) % this.sectionsMax;

			let y = Math.floor((this.nbSections - 1) / this.sectionsMax);

			this.section[this.nbSections - 1] = this.newObject(section());


			if (y % 2)
			console.log("impair");

			x = (y % 2) ? (this.sectionsMax - 1) - x : x;







			let deltaX = x * 92;
			let deltaY = y * 148;


			console.log("YYYY : ", y);
			console.log("XXXX : ", x);


			this.section[this.nbSections - 1].setPosition(this.sectionPosOriginX + deltaX, this.sectionPosOriginY + deltaY);

			if (x === (this.sectionsMax - 1) && y % 2 === 0)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerUpRight.png'});

			if (x === 0 && y % 2) {
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerUpLeft.png'});
				this.section[this.nbSections - 1].move(-30, 0);
			}

			if (x === (this.sectionsMax - 1) && y % 2)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerBottomRight.png'});

			if (x === 0 && y % 2 === 0) {
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerBottomLeft.png'});
				this.section[this.nbSections - 1].move(-30, 0);
			}

			console.log("hello ....");
			this.moveEndSection(this.endSection, this.nbSections);


			// if (this.nbSections % 6 === 0) {
			// 	this.endSection.render.changeImage({'src': '../../beginSection.png'});
			// }

		});

	}

	moveEndSection(endSection, nbSections) {

		let x = nbSections % this.sectionsMax;
		let y = Math.floor(nbSections / this.sectionsMax);

		x = (y % 2) ? (this.sectionsMax - 1) - x : x;


		endSection.setPosition(this.sectionPosOriginX + (92 * x), this.sectionPosOriginY + (148 * y));


		console.log(" >>> ", (y % 2));

		if (nbSections % this.sectionsMax === 0 && (y % 2)) {
			endSection.render.changeImage({'src': '../../endSectionCornerRight.png'});
			// endSection.setPosition(this.sectionPosOriginX + (92 * x) - 25, this.sectionPosOriginY + (148 * y));
			endSection.move(-36, 0);
		}
		else if (nbSections % this.sectionsMax === 0) {
			endSection.render.changeImage({'src': '../../endSectionCornerLeft.png'});
			// endSection.setPosition(this.sectionPosOriginX + (92 * x) - 25, this.sectionPosOriginY + (148 * y));
			endSection.move(-30, 0);
		}
		else if (y % 2) {
			endSection.render.changeImage({'src': '../../endSectionInvert.png'});
			endSection.move(-28, 0);
		}
		else
			endSection.render.changeImage({'src': '../../endSection.png'});


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
