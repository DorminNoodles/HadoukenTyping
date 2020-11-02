
import GameObject from '../core/gameObject';
import TextRender from './textRender';

class DeathTimer extends GameObject {

  constructor(name, seconds) {
    super(name);

    this.text = this.addGameObject(new TextRender('Timer'));
    this.endTime = Date.now() + (seconds * 1000);
    this.stop = false;
    this.nextWrite = Date.now();
    this.velocity = {
      x: 0,
      y: 10.0,
    }
  }

  update() {

    if (this.endTime - Date.now() < 0 && !this.stop) {
      this.stop = true;
      this.text.write(null, '');
      return;
    }

    if (!this.stop && this.nextWrite < Date.now()) {
      this.text.write(null, (this.endTime - Date.now()) + '');
      this.nextWrite = Date.now() + 120;
    }


    this.move();
  }

  move() {
    this.setLocalPosition(this.local.x, this.local.y - Math.round(this.velocity.y));
    this.velocity.y = (this.velocity.y - 1.2) > 0 ? this.velocity.y - 1.2 : 0.0;
  }

  forceStop() {
    this.stop = true;
  }

  isFinish() {
    return this.stop;
  }
}

export default DeathTimer;