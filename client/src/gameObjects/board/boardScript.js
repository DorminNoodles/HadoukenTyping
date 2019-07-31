import Script from '../../core/script';
import beginSection from './sections/beginSection'
import section from './sections/section'
import endSection from './sections/endSection'


class BoardScript extends Script {

	constructor() {
		super();

		// this.defaultNbSections = 4;
		this.nbSections = 4;
		this.sectionsMaxRow = 12;

		this.timer = Date.now() + 5000;

		this.sectionPosOriginX = 260;
		this.sectionPosOriginY = 400;

		this.beginSection = this.newObject(beginSection());
		this.beginSection.setPosition(this.sectionPosOriginX - 134, this.sectionPosOriginY);

		this.section = [];

		for (let i = 0; i < this.nbSections; i++) {
			this.section[i] = this.newObject(section());
			this.section[i].setPosition(this.sectionPosOriginX + (i * 92), this.sectionPosOriginY);
		}

		this.endSection = this.newObject(endSection());
		this.endSection.setPosition(this.sectionPosOriginX + (92 * this.nbSections), this.sectionPosOriginY);

		this.addListener('addBoardSection', () => {

			this.nbSections++;
			let x = (this.nbSections - 1) % this.sectionsMaxRow;

			let y = Math.floor((this.nbSections - 1) / this.sectionsMaxRow);

			this.section[this.nbSections - 1] = this.newObject(section());




			x = (y % 2) ? (this.sectionsMaxRow - 1) - x : x;


			let deltaX = x * 92;
			let deltaY = y * 148;



			this.section[this.nbSections - 1].setPosition(this.sectionPosOriginX + deltaX, this.sectionPosOriginY + deltaY);

			if (x === (this.sectionsMaxRow - 1) && y % 2 === 0)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerUpRight.png'});

			if (x === 0 && y % 2) {
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerUpLeft.png'});
				this.section[this.nbSections - 1].move(-30, 0);
			}

			if (x === (this.sectionsMaxRow - 1) && y % 2)
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerBottomRight.png'});

			if (x === 0 && y % 2 === 0) {
				this.section[this.nbSections - 1].render.changeImage({'src': '../../sectionCornerBottomLeft.png'});
				this.section[this.nbSections - 1].move(-30, 0);
			}

			this.moveEndSection(this.endSection, this.nbSections);

		});

	}

	moveEndSection(endSection, nbSections) {

		let x = nbSections % this.sectionsMaxRow;
		let y = Math.floor(nbSections / this.sectionsMaxRow);

		x = (y % 2) ? (this.sectionsMaxRow - 1) - x : x;


		// console.log(this.sectionPosOriginX + (92 * x), this.sectionPosOriginY + (148 * y));
		endSection.setPosition(this.sectionPosOriginX + (92 * x), this.sectionPosOriginY + (148 * y));



		if (nbSections % this.sectionsMaxRow === 0 && (y % 2)) {
			endSection.render.changeImage({'src': '../../endSectionCornerRight.png'});
			// endSection.setPosition(this.sectionPosOriginX + (92 * x) - 25, this.sectionPosOriginY + (148 * y));
			endSection.move(-36, 0);
		}
		else if (nbSections % this.sectionsMaxRow === 0) {
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
			this.timer = Date.now() + 5000;

			// console.log('EMIT ******************');
			let eventAddBoardSection = new CustomEvent("addBoardSection", {
				detail : {

				}
			});
			document.dispatchEvent(eventAddBoardSection);
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

export default BoardScript;
