import GameObject from '../core/gameObject';
import Render from '../render';
import * as anim from '../anim/AnimLetter';



class LetterLockFlash extends GameObject {

  constructor(name) {
    super(name);
    this.addRender(new Render('../images/letterLockFlash.png'));
    console.log('32rt2u34: ', anim);

    this.render.addAnim(anim['lockFlash']);
  }

  update() {

  }
}

export default LetterLockFlash;