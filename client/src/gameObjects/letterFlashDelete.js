import GameObject from '../core/gameObject';
import Render from '../render';


class LetterFlashDelete extends GameObject {

  constructor(name, sign) {
    super(name);

    this.lettersSign = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K'];
    this.color = this.lettersSign.findIndex(elem => elem === sign);

    this.addRender(new Render('../images/letterFlashDelete04.png'));
    this.render.setZIndex(200);

    this.render.setSize(80, 300);
    this.render.setSource(this.color*80, 0);
    // this.render.setSource(0, 0);
    this.opacityDelta = 60;
    this.opacityTime = Date.now() + this.opacityDelta;
    this.opacity = 1.0;
    this.opacityStep = 0.3;
    this.animFrame = 0;
  }

  update() {
    if (this.opacityTime < Date.now()) {
      this.opacityTime = Date.now() + this.opacityDelta;
      if (this.animFrame >= 1) {
        (this.opacity - this.opacityStep >= 0) ? this.opacity -= this.opacityStep: this.opacity = 0.0;
        this.render.changeOpacity(this.opacity);
      }
      this.animFrame++;
    }
  }
}

export default LetterFlashDelete;