
import GameObject from '../core/gameObject';
import TextRender from './textRender';

class DeathTimer extends GameObject {

  constructor(name, seconds) {
    super(name);

    this.ms = seconds * 1000;
    this.text = this.addGameObject(new TextRender('Timer'));
    this.nextUpdate = Date.now();
  }

  update() {

    if (this.nextUpdate < Date.now() && this.ms > 0) {
      console.log("DEATH TIME  ",this.ms);
      this.nextUpdate += 68;
      this.text.write(null, this.ms + '');
      this.ms -= 68;
    }

  }

}

export default DeathTimer;